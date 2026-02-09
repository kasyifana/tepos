// OEE Dashboard Client-Side JavaScript
// Mengambil data dari API dan menampilkan dashboard

let rawData = [];
let charts = [];

// Load data dari API saat halaman dimuat
async function loadData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    rawData = sanitizeData(data);
    
    // Initialize dates
    if (rawData.length > 0) {
      startDate.value = rawData[0].date;
      endDate.value = rawData[rawData.length - 1].date;
      startDate.min = endDate.min = rawData[0].date;
      startDate.max = endDate.max = rawData[rawData.length - 1].date;
    }
    
    updateDashboard();
  } catch (error) {
    console.error('Error loading data:', error);
  }
}

function sanitizeData(data) {
  return data.map((row) => {
    let cleanRow = {};
    for (let key in row) {
      let value = row[key];

      if (key === "date") {
        cleanRow[key] = value;
        continue;
      }

      if (
        value === null ||
        value === undefined ||
        value === "" ||
        isNaN(value)
      ) {
        cleanRow[key] = 0;
      } else {
        cleanRow[key] = Number(value);
      }
    }
    return cleanRow;
  });
}

function createGauge(ctx, value, color) {
  const data = [value, 100 - value];
  return new Chart(ctx, {
    type: "doughnut",
    data: {
      datasets: [
        {
          data: data,
          backgroundColor: [color, "#E5E7EB"],
          borderWidth: 0,
          cutout: "75%",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      },
    },
  });
}

function createTrendChart(ctx, data, color) {
  return new Chart(ctx, {
    type: "line",
    data: {
      labels: data.map((_, i) => ""),
      datasets: [
        {
          data: data,
          borderColor: color,
          backgroundColor: color + "20",
          fill: true,
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      },
      scales: {
        x: { display: false },
        y: { display: false },
      },
    },
  });
}

function getColor(value) {
  if (value >= 85) return "#10B981";
  if (value >= 70) return "#F59E0B";
  return "#EF4444";
}

function calculateMetrics(filtered) {
  let totalProduksi = 0,
    totalBak1 = 0,
    totalBak2 = 0,
    totalJam = 0;
  let totalMesin = 0,
    totalProdJam = 0;

  filtered.forEach((d) => {
    totalProduksi += d.esKeluar;
    totalBak1 += d.bak1;
    totalBak2 += d.bak2;
    totalJam += d.totalBeban;
    totalMesin += d.mesin;
    totalProdJam += d.prodJam;
  });

  let totalRusak = totalBak1 + totalBak2;
  let avgMesin = totalMesin / filtered.length;
  let avgProdJam = totalProdJam / filtered.length;

  let availability = totalJam / (avgMesin * 24 * filtered.length);
  let performance = totalProduksi / (totalJam * avgProdJam);
  let quality = (totalProduksi - totalRusak) / totalProduksi;
  let oee = availability * performance * quality;

  return {
    oee: oee * 100,
    availability: availability * 100,
    performance: performance * 100,
    quality: quality * 100,
    totalProduksi,
    totalRusak,
  };
}

function updateDashboard() {
  if (rawData.length === 0) return;
  
  charts.forEach((c) => c.destroy());
  charts = [];

  let filtered = rawData.filter(
    (d) => d.date >= startDate.value && d.date <= endDate.value,
  );
  
  if (filtered.length === 0) return;
  
  let metrics = calculateMetrics(filtered);

  // Update gauge values
  valOEE.textContent = metrics.oee.toFixed(2) + "%";
  valAvail.textContent = metrics.availability.toFixed(2) + "%";
  valPerf.textContent = metrics.performance.toFixed(2) + "%";
  valQual.textContent = metrics.quality.toFixed(2) + "%";

  // Update subtitles
  subOEE.textContent = metrics.oee.toFixed(1) + "%";
  subAvail.textContent = metrics.availability.toFixed(1) + "%";
  subPerf.textContent = metrics.performance.toFixed(1) + "%";
  subQual.textContent = metrics.quality.toFixed(1) + "%";

  // Create gauges
  charts.push(createGauge(gaugeOEE, metrics.oee, getColor(metrics.oee)));
  charts.push(
    createGauge(
      gaugeAvail,
      metrics.availability,
      getColor(metrics.availability),
    ),
  );
  charts.push(
    createGauge(
      gaugePerf,
      metrics.performance,
      getColor(metrics.performance),
    ),
  );
  charts.push(
    createGauge(gaugeQual, metrics.quality, getColor(metrics.quality)),
  );

  // Create trend charts (simplified - using actual data trends)
  const trendOEEData = filtered.map((d) => {
    let m = calculateMetrics([d]);
    return m.oee;
  });
  const trendAvailData = filtered.map((d) => {
    let m = calculateMetrics([d]);
    return m.availability;
  });
  const trendPerfData = filtered.map((d) => {
    let m = calculateMetrics([d]);
    return m.performance;
  });
  const trendQualData = filtered.map((d) => {
    let m = calculateMetrics([d]);
    return m.quality;
  });

  charts.push(
    createTrendChart(trendOEE, trendOEEData, getColor(metrics.oee)),
  );
  charts.push(
    createTrendChart(
      trendAvail,
      trendAvailData,
      getColor(metrics.availability),
    ),
  );
  charts.push(
    createTrendChart(
      trendPerf,
      trendPerfData,
      getColor(metrics.performance),
    ),
  );
  charts.push(
    createTrendChart(trendQual, trendQualData, getColor(metrics.quality)),
  );

  // Update KPIs with actual data
  let totalEsKeluar = 0;
  let totalDefects = 0;
  let totalTidakTerjual = 0;
  let totalProdJam = 0;
  let totalTenagaKerja = 0;
  let totalOutputTK = 0;
  let totalSelisihOrder = 0;
  let totalPuncak = 0;
  let avgPersenPenjualan = 0;

  filtered.forEach((d) => {
    totalEsKeluar += d.esKeluar;
    totalDefects += d.totalRusak;
    totalTidakTerjual += d.tidakTerjual;
    totalProdJam += d.prodJam;
    totalTenagaKerja += d.tenagaKerja;
    totalOutputTK += d.outputTK;
    totalSelisihOrder += d.selisihOrder;
    totalPuncak += d.puncak;
    avgPersenPenjualan += d.persenPenjualan;
  });

  let avgProdJamValue = totalProdJam / filtered.length;
  let avgWorkforceEff = totalOutputTK / filtered.length;
  let avgSalesRate = avgPersenPenjualan / filtered.length;

  // Update KPI values
  totalProdVal.textContent = totalEsKeluar.toLocaleString();
  totalProdChange.textContent = "Es Keluar";

  totalDefectVal.textContent = totalDefects.toLocaleString();
  totalDefectChange.textContent = "Bak 1 + Bak 2";
  totalDefectChange.className =
    "kpi-change " + (totalDefects > 100 ? "negative" : "positive");

  avgProdVal.textContent = avgProdJamValue.toFixed(1);
  avgProdChange.textContent = "bal/jam";

  workforceVal.textContent = avgWorkforceEff.toFixed(1);
  workforceChange.textContent = "bal/worker";

  unsoldVal.textContent = totalTidakTerjual.toLocaleString();
  unsoldChange.textContent = "bal";
  unsoldChange.className =
    "kpi-change " + (totalTidakTerjual > 50000 ? "negative" : "positive");

  salesRateVal.textContent = avgSalesRate.toFixed(1) + "%";
  salesRateChange.textContent = "Persentase Penjualan";
  salesRateChange.className =
    "kpi-change " + (avgSalesRate >= 70 ? "positive" : "negative");

  orderFulfillVal.textContent = totalSelisihOrder.toLocaleString();
  orderFulfillChange.textContent =
    totalSelisihOrder === 0
      ? "Perfect"
      : totalSelisihOrder > 0
        ? "Surplus"
        : "Gap";
  orderFulfillChange.className =
    "kpi-change " + (totalSelisihOrder >= 0 ? "positive" : "negative");

  peakLoadVal.textContent = totalPuncak;
  peakLoadChange.textContent = "hours";
  peakLoadChange.className =
    "kpi-change " + (totalPuncak > 100 ? "negative" : "positive");

  // Create timeline visualization
  createTimeline(filtered);
}

function createTimeline(filtered) {
  const timeline = document.getElementById("timelineViz");
  timeline.innerHTML = "";

  // Calculate totals for distribution
  let totalNormal = 0,
    totalPuncak = 0,
    totalBak1 = 0,
    totalBak2 = 0;
  let totalBeban = 0,
    totalDowntime = 0;
  let maxBeban = 0;

  filtered.forEach((d) => {
    totalNormal += d.normal;
    totalPuncak += d.puncak;
    totalBak1 += d.bak1;
    totalBak2 += d.bak2;
    totalBeban += d.totalBeban;
    maxBeban = Math.max(maxBeban, d.totalBeban);
    totalDowntime += d.mesin * 24 - d.totalBeban;
  });

  const categories = [
    { name: "Overview", data: null },
    { name: "Running (Normal Load)", data: "normal", color: "#10B981" },
    { name: "Peak Power Load", data: "puncak", color: "#FCD34D" },
    { name: "Tank 1 Defects", data: "bak1", color: "#FB923C" },
    { name: "Tank 2 Defects", data: "bak2", color: "#EF4444" },
    { name: "Machine Idle", data: "idle", color: "#93C5FD" },
  ];

  categories.forEach((cat) => {
    const row = document.createElement("div");
    row.className = "status-row";

    const label = document.createElement("div");
    label.className = "status-label";
    label.textContent = cat.name;

    const bar = document.createElement("div");
    bar.className = "status-bar";

    if (cat.name === "Overview") {
      filtered.forEach((d, i) => {
        if (d.normal > 0) {
          const seg = document.createElement("div");
          seg.className = "status-segment";
          seg.style.width = (d.normal / maxBeban) * 3 + "%";
          seg.style.background = "#10B981";
          seg.title = `Day ${i + 1}: Normal ${d.normal}h`;
          bar.appendChild(seg);
        }

        if (d.puncak > 0) {
          const seg = document.createElement("div");
          seg.className = "status-segment";
          seg.style.width = (d.puncak / maxBeban) * 3 + "%";
          seg.style.background = "#FCD34D";
          seg.title = `Day ${i + 1}: Peak ${d.puncak}h`;
          bar.appendChild(seg);
        }

        if (d.bak1 > 0) {
          const seg = document.createElement("div");
          seg.className = "status-segment";
          seg.style.width = "0.5%";
          seg.style.background = "#FB923C";
          seg.title = `Day ${i + 1}: Tank1 ${d.bak1} units`;
          bar.appendChild(seg);
        }

        if (d.bak2 > 0) {
          const seg = document.createElement("div");
          seg.className = "status-segment";
          seg.style.width = d.bak2 > 20 ? "1.5%" : "0.5%";
          seg.style.background = "#EF4444";
          seg.title = `Day ${i + 1}: Tank2 ${d.bak2} units`;
          bar.appendChild(seg);
        }

        const idle = d.mesin * 24 - d.totalBeban;
        if (idle > 0) {
          const seg = document.createElement("div");
          seg.className = "status-segment";
          seg.style.width = (idle / maxBeban) * 2 + "%";
          seg.style.background = "#93C5FD";
          seg.title = `Day ${i + 1}: Idle ${idle}h`;
          bar.appendChild(seg);
        }
      });
    } else {
      filtered.forEach((d, i) => {
        let value = 0;
        let segWidth = 0;

        if (cat.data === "normal") {
          value = d.normal;
          segWidth = (value / maxBeban) * 3;
        } else if (cat.data === "puncak") {
          value = d.puncak;
          segWidth = (value / maxBeban) * 3;
        } else if (cat.data === "bak1") {
          value = d.bak1;
          segWidth = value > 0 ? (value > 5 ? 1 : 0.5) : 0;
        } else if (cat.data === "bak2") {
          value = d.bak2;
          segWidth =
            value > 0 ? (value > 20 ? 1.5 : value > 5 ? 1 : 0.5) : 0;
        } else if (cat.data === "idle") {
          value = d.mesin * 24 - d.totalBeban;
          segWidth = (value / maxBeban) * 2;
        }

        if (value > 0) {
          const seg = document.createElement("div");
          seg.className = "status-segment";
          seg.style.width = segWidth + "%";
          seg.style.background = cat.color;
          seg.title = `Day ${i + 1}: ${value}${cat.data === "bak1" || cat.data === "bak2" ? " units" : "h"}`;
          bar.appendChild(seg);
        }
      });
    }

    row.appendChild(label);
    row.appendChild(bar);
    timeline.appendChild(row);
  });

  updateDistribution(
    totalNormal,
    totalPuncak,
    totalBak1,
    totalBak2,
    totalDowntime,
    filtered.length,
  );
}

function updateDistribution(
  totalNormal,
  totalPuncak,
  totalBak1,
  totalBak2,
  totalIdle,
  numDays,
) {
  document.getElementById("distNormal").textContent = totalNormal + " hrs";
  document.getElementById("distPeak").textContent = totalPuncak + " hrs";
  document.getElementById("distBak1").textContent = totalBak1 + " units";
  document.getElementById("distBak2").textContent = totalBak2 + " units";
  document.getElementById("distIdle").textContent =
    Math.round(totalIdle) + " hrs";

  let filtered = rawData.filter(
    (d) => d.date >= startDate.value && d.date <= endDate.value,
  );

  let normalDays = filtered.filter((d) => d.normal > 0).length;
  let peakDays = filtered.filter((d) => d.puncak > 0).length;
  let bak1Days = filtered.filter((d) => d.bak1 > 0).length;
  let bak2Days = filtered.filter((d) => d.bak2 > 0).length;
  let idleDays = filtered.filter(
    (d) => d.mesin * 24 - d.totalBeban > 0,
  ).length;

  document.getElementById("distNormalCount").textContent =
    normalDays + " days";
  document.getElementById("distPeakCount").textContent = peakDays + " days";
  document.getElementById("distBak1Count").textContent = bak1Days + " days";
  document.getElementById("distBak2Count").textContent = bak2Days + " days";
  document.getElementById("distIdleCount").textContent = idleDays + " days";
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  startDate.addEventListener("change", updateDashboard);
  endDate.addEventListener("change", updateDashboard);
  
  // Load data on page load
  loadData();
  
  // CSV Import Modal handlers
  setupCSVImport();
});

// ============== CSV IMPORT FUNCTIONALITY ==============

function setupCSVImport() {
  const modal = document.getElementById('csvModal');
  const importBtn = document.getElementById('importBtn');
  const closeBtn = document.querySelector('.close');
  const uploadArea = document.getElementById('uploadArea');
  const fileInput = document.getElementById('csvFileInput');
  const uploadBtn = document.getElementById('uploadBtn');
  const resetBtn = document.getElementById('resetDataBtn');
  const downloadTemplateBtn = document.getElementById('downloadTemplateBtn');
  const downloadExcelBtn = document.getElementById('downloadExcelBtn');
  const uploadStatus = document.getElementById('uploadStatus');
  
  let selectedFile = null;

  // Open modal
  importBtn.onclick = () => {
    modal.style.display = 'block';
    uploadStatus.style.display = 'none';
    uploadStatus.className = 'upload-status';
  };

  // Close modal
  closeBtn.onclick = () => {
    modal.style.display = 'none';
    selectedFile = null;
    uploadBtn.disabled = true;
  };

  // Close modal when clicking outside
  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
      selectedFile = null;
      uploadBtn.disabled = true;
    }
  };

  // Download template
  downloadTemplateBtn.onclick = async () => {
    try {
      const response = await fetch('/api/download-template?format=csv');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'oee-template.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading template:', error);
      alert('Error downloading template');
    }
  };

  // Download Excel template
  downloadExcelBtn.onclick = async () => {
    try {
      const response = await fetch('/api/download-template?format=xlsx');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'oee-template.xlsx';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading Excel template:', error);
      alert('Error downloading Excel template');
    }
  };

  // File input change
  fileInput.onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  // Drag and drop
  uploadArea.ondragover = (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
  };

  uploadArea.ondragleave = () => {
    uploadArea.classList.remove('dragover');
  };

  uploadArea.ondrop = (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    
    const file = e.dataTransfer.files[0];
    const validExtensions = ['.csv', '.xlsx', '.xls'];
    const fileExt = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    
    if (file && validExtensions.includes(fileExt)) {
      handleFileSelect(file);
    } else {
      showStatus('error', 'Please drop a CSV or Excel file (.csv, .xlsx, .xls)');
    }
  };

  function handleFileSelect(file) {
    selectedFile = file;
    uploadBtn.disabled = false;
    
    const fileExt = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    const fileType = fileExt === '.csv' ? 'CSV' : 'Excel';
    
    showStatus('info', `${fileType} file selected: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`);
  }

  // Upload CSV
  uploadBtn.onclick = async () => {
    if (!selectedFile) return;
    
    const formData = new FormData();
    formData.append('csvFile', selectedFile);
    
    uploadBtn.disabled = true;
    const fileExt = selectedFile.name.substring(selectedFile.name.lastIndexOf('.')).toLowerCase();
    const fileType = fileExt === '.csv' ? 'CSV' : 'Excel';
    
    uploadBtn.textContent = 'Uploading...';
    showStatus('info', `Uploading and processing ${fileType} file...`);
    
    try {
      const response = await fetch('/api/upload-csv', {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      
      if (result.success) {
        showStatus('success', `✓ ${result.message}\nDate range: ${result.dateRange.start} to ${result.dateRange.end}`);
        
        // Reload data and update dashboard
        setTimeout(async () => {
          await loadData();
          modal.style.display = 'none';
          selectedFile = null;
        }, 2000);
      } else {
        showStatus('error', `✗ Upload failed: ${result.error || 'Unknown error'}`);
        uploadBtn.disabled = false;
      }
    } catch (error) {
      showStatus('error', `✗ Error: ${error.message}`);
      uploadBtn.disabled = false;
    } finally {
      uploadBtn.textContent = 'Upload File';
    }
  };

  // Reset data
  resetBtn.onclick = async () => {
    if (!confirm('Are you sure you want to reset to default data?')) {
      return;
    }
    
    resetBtn.disabled = true;
    resetBtn.textContent = 'Resetting...';
    
    try {
      const response = await fetch('/api/reset-data', {
        method: 'POST'
      });
      
      const result = await response.json();
      
      if (result.success) {
        showStatus('success', `✓ ${result.message} (${result.recordCount} records)`);
        
        // Reload data and update dashboard
        setTimeout(async () => {
          await loadData();
          modal.style.display = 'none';
        }, 2000);
      } else {
        showStatus('error', '✗ Reset failed');
      }
    } catch (error) {
      showStatus('error', `✗ Error: ${error.message}`);
    } finally {
      resetBtn.disabled = false;
      resetBtn.textContent = 'Reset ke Data Default';
    }
  };

  function showStatus(type, message) {
    uploadStatus.className = `upload-status ${type}`;
    uploadStatus.textContent = message;
    uploadStatus.style.display = 'block';
  }
}

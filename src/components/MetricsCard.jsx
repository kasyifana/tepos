import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import './MetricsCard.css';

function MetricsCard({ data }) {
  const gaugeRefs = {
    oee: useRef(null),
    availability: useRef(null),
    performance: useRef(null),
    quality: useRef(null)
  };

  const chartInstances = useRef({});

  const calculateMetrics = () => {
    if (!data || data.length === 0) return null;

    const totals = data.reduce((acc, row) => {
      const waktuOperasi = parseFloat(row['Waktu Operasi (Jam)'] || 0);
      const downtime = parseFloat(row['Downtime (Jam)'] || 0);
      const kapasitasMesin = parseFloat(row['Kapasitas Mesin (Bal/Jam)'] || 120);
      const esKeluar = parseFloat(row['Es Keluar (Bal)'] || 0);
      const defect1 = parseFloat(row['Defect Bak 1 (Bal)'] || 0);
      const defect2 = parseFloat(row['Defect Bak 2 (Bal)'] || 0);
      const defect3 = parseFloat(row['Defect Bak 3 (Bal)'] || 0);
      
      // Waktu aktual produksi = Waktu Operasi - Downtime
      const waktuAktual = waktuOperasi - downtime;
      
      // Produksi Ideal = Waktu Aktual × Kapasitas Mesin
      const produksiIdeal = waktuAktual * kapasitasMesin;
      
      // Good Production = Total Es - All Defects
      const goodProd = esKeluar - defect1 - defect2 - defect3;
      
      acc.plannedTime += waktuOperasi;
      acc.actualTime += waktuAktual;
      acc.idealProd += produksiIdeal;
      acc.actualProd += esKeluar;
      acc.goodProd += goodProd;
      
      return acc;
    }, { plannedTime: 0, actualTime: 0, idealProd: 0, actualProd: 0, goodProd: 0 });

    const availability = totals.plannedTime > 0 ? (totals.actualTime / totals.plannedTime) * 100 : 0;
    const performance = totals.idealProd > 0 ? (totals.actualProd / totals.idealProd) * 100 : 0;
    const quality = totals.actualProd > 0 ? (totals.goodProd / totals.actualProd) * 100 : 0;
    const oee = (availability * performance * quality) / 10000;

    return {
      oee: Math.min(oee, 100).toFixed(1),
      availability: Math.min(availability, 100).toFixed(1),
      performance: Math.min(performance, 100).toFixed(1),
      quality: Math.min(quality, 100).toFixed(1)
    };
  };

  const createGauge = (canvasRef, value, label) => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    const percentage = parseFloat(value);
    
    let color = '#10b981';
    if (percentage < 50) color = '#ef4444';
    else if (percentage < 75) color = '#f59e0b';

    if (chartInstances.current[label]) {
      chartInstances.current[label].destroy();
    }

    chartInstances.current[label] = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [percentage, 100 - percentage],
          backgroundColor: [color, '#e5e7eb'],
          borderWidth: 0
        }]
      },
      options: {
        cutout: '75%',
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }
        }
      }
    });
  };

  useEffect(() => {
    const metrics = calculateMetrics();
    if (!metrics) return;

    createGauge(gaugeRefs.oee, metrics.oee, 'oee');
    createGauge(gaugeRefs.availability, metrics.availability, 'availability');
    createGauge(gaugeRefs.performance, metrics.performance, 'performance');
    createGauge(gaugeRefs.quality, metrics.quality, 'quality');

    return () => {
      Object.values(chartInstances.current).forEach(chart => chart?.destroy());
    };
  }, [data]);

  const metrics = calculateMetrics();
  if (!metrics) return <div className="card">No data available</div>;

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">OEE</span>
        <a className="details-link">Details →</a>
      </div>

      <div className="gauge-grid">
        <div className="gauge-container">
          <div className="gauge-label">OEE</div>
          <div className="gauge-wrapper">
            <canvas ref={gaugeRefs.oee}></canvas>
          </div>
          <div className="gauge-value">{metrics.oee}%</div>
        </div>

        <div className="gauge-container">
          <div className="gauge-label">Availability</div>
          <div className="gauge-wrapper">
            <canvas ref={gaugeRefs.availability}></canvas>
          </div>
          <div className="gauge-value">{metrics.availability}%</div>
        </div>

        <div className="gauge-container">
          <div className="gauge-label">Performance</div>
          <div className="gauge-wrapper">
            <canvas ref={gaugeRefs.performance}></canvas>
          </div>
          <div className="gauge-value">{metrics.performance}%</div>
        </div>

        <div className="gauge-container">
          <div className="gauge-label">Quality</div>
          <div className="gauge-wrapper">
            <canvas ref={gaugeRefs.quality}></canvas>
          </div>
          <div className="gauge-value">{metrics.quality}%</div>
        </div>
      </div>
    </div>
  );
}

export default MetricsCard;
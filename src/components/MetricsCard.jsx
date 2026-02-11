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

    let totalProduksi = 0, totalBak1 = 0, totalBak2 = 0, totalJam = 0;
    let totalMesin = 0, totalProdJam = 0;

    data.forEach((row) => {
      // Support both formats: script.js format and Indonesian format
      totalProduksi += parseFloat(row.esKeluar || row['Es Keluar (Bal)'] || 0);
      totalBak1 += parseFloat(row.bak1 || row['Defect Bak 1 (Bal)'] || 0);
      totalBak2 += parseFloat(row.bak2 || row['Defect Bak 2 (Bal)'] || 0);
      totalJam += parseFloat(row.totalBeban || row['Waktu Operasi (Jam)'] || 0);
      totalMesin += parseFloat(row.mesin || 3); // default 3 mesin
      totalProdJam += parseFloat(row.prodJam || row['Kapasitas Mesin (Bal/Jam)'] || 0);
    });

    const totalRusak = totalBak1 + totalBak2;
    const avgMesin = totalMesin / data.length;
    const avgProdJam = totalProdJam / data.length;

    // Formula dari script.js
    const availability = totalJam / (avgMesin * 24 * data.length);
    const performance = totalProduksi / (totalJam * avgProdJam);
    const quality = (totalProduksi - totalRusak) / totalProduksi;
    const oee = availability * performance * quality;

    return {
      oee: Math.min(oee * 100, 100).toFixed(1),
      availability: Math.min(availability * 100, 100).toFixed(1),
      performance: Math.min(performance * 100, 100).toFixed(1),
      quality: Math.min(quality * 100, 100).toFixed(1)
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
import './Timeline.css';

function Timeline({ data }) {
  const calculateDistribution = () => {
    if (!data || data.length === 0) return null;

    const dist = data.reduce((acc, row) => {
      const normalHours = parseFloat(row['Waktu Aktual Produksi (Jam)'] || 0) - parseFloat(row['Jam Beban Puncak (Jam)'] || 0);
      acc.normal.hours += normalHours;
      acc.normal.days += normalHours > 0 ? 1 : 0;
      
      const peakHours = parseFloat(row['Jam Beban Puncak (Jam)'] || 0);
      acc.peak.hours += peakHours;
      acc.peak.days += peakHours > 0 ? 1 : 0;
      
      const bak1 = parseFloat(row['Defect Bak 1 (Bal)'] || 0);
      acc.bak1.units += bak1;
      acc.bak1.days += bak1 > 0 ? 1 : 0;
      
      const bak2 = parseFloat(row['Defect Bak 2 (Bal)'] || 0);
      acc.bak2.units += bak2;
      acc.bak2.days += bak2 > 0 ? 1 : 0;
      
      const idleHours = parseFloat(row['Waktu Operasi (Jam)'] || 0) - parseFloat(row['Waktu Aktual Produksi (Jam)'] || 0);
      acc.idle.hours += Math.max(0, idleHours);
      acc.idle.days += idleHours > 0 ? 1 : 0;
      
      return acc;
    }, {
      normal: { hours: 0, days: 0 },
      peak: { hours: 0, days: 0 },
      bak1: { units: 0, days: 0 },
      bak2: { units: 0, days: 0 },
      idle: { hours: 0, days: 0 }
    });

    return dist;
  };

  const dist = calculateDistribution();
  if (!dist) return null;

  return (
    <div className="timeline-container">
      <div className="timeline-header">
        <span className="card-title">Machine status for current data</span>
        <div className="timeline-legend">
          <div className="legend-item">
            <div className="legend-color" style={{ background: '#10b981' }}></div>
            <span>Running (Normal Load)</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ background: '#fcd34d' }}></div>
            <span>Peak Power Load</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ background: '#fb923c' }}></div>
            <span>Tank 1 Defects</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ background: '#ef4444' }}></div>
            <span>Tank 2 Defects</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ background: '#93c5fd' }}></div>
            <span>Machine Idle</span>
          </div>
        </div>
      </div>

      <div className="distribution-panel">
        <div className="distribution-title">Distribution</div>
        
        <div className="distribution-item">
          <div className="dist-label">
            <div className="legend-color" style={{ background: '#10b981' }}></div>
            <span>Running (Normal Load)</span>
          </div>
          <div>
            <span className="dist-time">{dist.normal.hours.toFixed(1)} hrs</span>
            <span className="dist-count"> · {dist.normal.days} days</span>
          </div>
        </div>

        <div className="distribution-item">
          <div className="dist-label">
            <div className="legend-color" style={{ background: '#fcd34d' }}></div>
            <span>Peak Power Load</span>
          </div>
          <div>
            <span className="dist-time">{dist.peak.hours.toFixed(1)} hrs</span>
            <span className="dist-count"> · {dist.peak.days} days</span>
          </div>
        </div>

        <div className="distribution-item">
          <div className="dist-label">
            <div className="legend-color" style={{ background: '#fb923c' }}></div>
            <span>Tank 1 Defects</span>
          </div>
          <div>
            <span className="dist-time">{dist.bak1.units.toFixed(0)} units</span>
            <span className="dist-count"> · {dist.bak1.days} days</span>
          </div>
        </div>

        <div className="distribution-item">
          <div className="dist-label">
            <div className="legend-color" style={{ background: '#ef4444' }}></div>
            <span>Tank 2 Defects</span>
          </div>
          <div>
            <span className="dist-time">{dist.bak2.units.toFixed(0)} units</span>
            <span className="dist-count"> · {dist.bak2.days} days</span>
          </div>
        </div>

        <div className="distribution-item">
          <div className="dist-label">
            <div className="legend-color" style={{ background: '#93c5fd' }}></div>
            <span>Machine Idle</span>
          </div>
          <div>
            <span className="dist-time">{dist.idle.hours.toFixed(1)} hrs</span>
            <span className="dist-count"> · {dist.idle.days} days</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Timeline;
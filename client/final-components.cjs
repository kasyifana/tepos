const fs = require('fs');

const allComponents = {
  'src/components/KPICard.jsx': `import './KPICard.css';

function KPICard({ data }) {
  const calculateKPIs = () => {
    if (!data || data.length === 0) return null;

    const totals = data.reduce((acc, row) => {
      acc.totalProd += parseFloat(row['Es Keluar (Bal)'] || 0);
      acc.totalDefects += parseFloat(row['Defect Bak 1 (Bal)'] || 0) + parseFloat(row['Defect Bak 2 (Bal)'] || 0);
      acc.totalHours += parseFloat(row['Waktu Aktual Produksi (Jam)'] || 0);
      acc.totalWorkers += parseFloat(row['Jumlah Pekerja'] || 0);
      acc.unsold += parseFloat(row['Es Tidak Terjual (Bal)'] || 0);
      acc.orders += parseFloat(row['Permintaan Es (Bal)'] || 0);
      acc.peakHours += parseFloat(row['Jam Beban Puncak (Jam)'] || 0);
      return acc;
    }, { totalProd: 0, totalDefects: 0, totalHours: 0, totalWorkers: 0, unsold: 0, orders: 0, peakHours: 0 });

    const avgProd = totals.totalHours > 0 ? (totals.totalProd / totals.totalHours).toFixed(1) : 0;
    const workforce = totals.totalWorkers > 0 ? (totals.totalProd / totals.totalWorkers).toFixed(1) : 0;
    const salesRate = totals.totalProd > 0 ? (((totals.totalProd - totals.unsold) / totals.totalProd) * 100).toFixed(1) : 0;
    const orderFulfill = totals.totalProd - totals.orders;

    return {
      totalProd: totals.totalProd.toFixed(0),
      totalDefects: totals.totalDefects.toFixed(0),
      avgProd,
      workforce,
      unsold: totals.unsold.toFixed(0),
      salesRate,
      orderFulfill: orderFulfill.toFixed(0),
      peakHours: totals.peakHours.toFixed(1)
    };
  };

  const kpis = calculateKPIs();
  if (!kpis) return <div className="card">No data available</div>;

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">Other KPIs</span>
        <span style={{ fontSize: '12px', color: 'var(--text-gray)' }}>Key Performance Indicators</span>
      </div>

      <div className="kpi-grid">
        <div className="kpi-item">
          <div className="kpi-label">Total Production</div>
          <div className="kpi-value">{kpis.totalProd}</div>
          <div className="kpi-change">Es Keluar</div>
        </div>

        <div className="kpi-item">
          <div className="kpi-label">Total Defects</div>
          <div className="kpi-value">{kpis.totalDefects}</div>
          <div className="kpi-change">Bak 1 + Bak 2</div>
        </div>

        <div className="kpi-item">
          <div className="kpi-label">Avg Productivity</div>
          <div className="kpi-value">{kpis.avgProd}</div>
          <div className="kpi-change">bal/jam</div>
        </div>

        <div className="kpi-item">
          <div className="kpi-label">Workforce Efficiency</div>
          <div className="kpi-value">{kpis.workforce}</div>
          <div className="kpi-change">bal/worker</div>
        </div>

        <div className="kpi-item">
          <div className="kpi-label">Unsold Ice</div>
          <div className="kpi-value">{kpis.unsold}</div>
          <div className="kpi-change">bal</div>
        </div>

        <div className="kpi-item">
          <div className="kpi-label">Sales Rate</div>
          <div className="kpi-value">{kpis.salesRate}%</div>
          <div className="kpi-change">Persentase Penjualan</div>
        </div>

        <div className="kpi-item">
          <div className="kpi-label">Order Fulfillment</div>
          <div className="kpi-value">{kpis.orderFulfill}</div>
          <div className={\`kpi-change \${parseFloat(kpis.orderFulfill) < 0 ? 'negative' : 'positive'}\`}>gap</div>
        </div>

        <div className="kpi-item">
          <div className="kpi-label">Peak Load Hours</div>
          <div className="kpi-value">{kpis.peakHours}</div>
          <div className="kpi-change">hours</div>
        </div>
      </div>
    </div>
  );
}

export default KPICard;`,

  'src/components/KPICard.css': `.kpi-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.kpi-item {
  padding: 12px;
  background: var(--bg-gray);
  border-radius: 8px;
}

.kpi-label {
  font-size: 12px;
  color: var(--text-gray);
  margin-bottom: 4px;
}

.kpi-value {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-dark);
}

.kpi-change {
  font-size: 11px;
  margin-top: 2px;
  color: var(--text-gray);
}

.kpi-change.positive {
  color: var(--success);
}

.kpi-change.negative {
  color: var(--danger);
}`,

  'src/components/Timeline.jsx': `import './Timeline.css';

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

export default Timeline;`,

  'src/components/Timeline.css': `.timeline-container {
  background: var(--white);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;
}

.timeline-legend {
  display: flex;
  gap: 16px;
  font-size: 12px;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

.distribution-panel {
  background: var(--bg-gray);
  padding: 16px;
  border-radius: 8px;
  margin-top: 16px;
}

.distribution-title {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 12px;
}

.distribution-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid var(--border-light);
}

.distribution-item:last-child {
  border-bottom: none;
}

.dist-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}

.dist-time {
  font-weight: 600;
}

.dist-count {
  color: var(--text-gray);
  font-size: 11px;
}`
};

Object.entries(allComponents).forEach(([file, content]) => {
  fs.writeFileSync(file, content);
  console.log('✅ Created:', file);
});

console.log('\n🎉 KPICard and Timeline components created!');

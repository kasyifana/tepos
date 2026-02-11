import './KPICard.css';

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
          <div className={`kpi-change ${parseFloat(kpis.orderFulfill) < 0 ? 'negative' : 'positive'}`}>gap</div>
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

export default KPICard;
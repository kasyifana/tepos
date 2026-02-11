import './KPICard.css';

function KPICard({ data }) {
  const calculateKPIs = () => {
    if (!data || data.length === 0) return null;

    const totals = data.reduce((acc, row) => {
      const esKeluar = parseFloat(row['Es Keluar (Bal)'] || 0);
      const defect1 = parseFloat(row['Defect Bak 1 (Bal)'] || 0);
      const defect2 = parseFloat(row['Defect Bak 2 (Bal)'] || 0);
      const defect3 = parseFloat(row['Defect Bak 3 (Bal)'] || 0);
      const waktuOperasi = parseFloat(row['Waktu Operasi (Jam)'] || 0);
      const downtime = parseFloat(row['Downtime (Jam)'] || 0);
      const waktuPersiapan = parseFloat(row['Waktu Persiapan (Jam)'] || 0);
      const waktuIstirahat = parseFloat(row['Waktu Istirahat (Jam)'] || 0);
      const waktuMaintenance = parseFloat(row['Waktu Maintenance (Jam)'] || 0);
      
      const waktuAktual = waktuOperasi - downtime;
      const totalDefects = defect1 + defect2 + defect3;
      
      acc.totalProd += esKeluar;
      acc.totalDefects += totalDefects;
      acc.totalHours += waktuAktual;
      acc.downtime += downtime;
      acc.persiapan += waktuPersiapan;
      acc.istirahat += waktuIstirahat;
      acc.maintenance += waktuMaintenance;
      acc.goodProd += (esKeluar - totalDefects);
      
      return acc;
    }, { totalProd: 0, totalDefects: 0, totalHours: 0, downtime: 0, persiapan: 0, istirahat: 0, maintenance: 0, goodProd: 0 });

    const avgProd = totals.totalHours > 0 ? (totals.totalProd / totals.totalHours).toFixed(1) : 0;
    const defectRate = totals.totalProd > 0 ? ((totals.totalDefects / totals.totalProd) * 100).toFixed(1) : 0;
    const goodRate = totals.totalProd > 0 ? ((totals.goodProd / totals.totalProd) * 100).toFixed(1) : 0;
    const utilizationRate = (totals.totalHours + totals.downtime) > 0 ? 
      ((totals.totalHours / (totals.totalHours + totals.downtime)) * 100).toFixed(1) : 0;

    return {
      totalProd: totals.totalProd.toFixed(0),
      totalDefects: totals.totalDefects.toFixed(0),
      avgProd,
      defectRate,
      downtime: totals.downtime.toFixed(1),
      goodRate,
      persiapan: totals.persiapan.toFixed(1),
      utilizationRate
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
          <div className="kpi-change">Es Keluar (Bal)</div>
        </div>

        <div className="kpi-item">
          <div className="kpi-label">Total Defects</div>
          <div className="kpi-value">{kpis.totalDefects}</div>
          <div className="kpi-change">All Defects (Bal)</div>
        </div>

        <div className="kpi-item">
          <div className="kpi-label">Avg Productivity</div>
          <div className="kpi-value">{kpis.avgProd}</div>
          <div className="kpi-change">bal/jam</div>
        </div>

        <div className="kpi-item">
          <div className="kpi-label">Defect Rate</div>
          <div className="kpi-value">{kpis.defectRate}%</div>
          <div className="kpi-change">% dari Produksi</div>
        </div>

        <div className="kpi-item">
          <div className="kpi-label">Total Downtime</div>
          <div className="kpi-value">{kpis.downtime}</div>
          <div className="kpi-change">Jam</div>
        </div>

        <div className="kpi-item">
          <div className="kpi-label">Good Production</div>
          <div className="kpi-value">{kpis.goodRate}%</div>
          <div className="kpi-change">% Tanpa Defect</div>
        </div>

        <div className="kpi-item">
          <div className="kpi-label">Setup Time</div>
          <div className="kpi-value">{kpis.persiapan}</div>
          <div className="kpi-change">Jam Persiapan</div>
        </div>

        <div className="kpi-item">
          <div className="kpi-label">Utilization Rate</div>
          <div className="kpi-value">{kpis.utilizationRate}%</div>
          <div className="kpi-change">Operating Time</div>
        </div>
      </div>
    </div>
  );
}

export default KPICard;
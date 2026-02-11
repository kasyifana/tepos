import './KPICard.css';

function KPICard({ data }) {
  const calculateKPIs = () => {
    if (!data || data.length === 0) return null;

    let totalEsKeluar = 0, totalDefects = 0, totalTidakTerjual = 0;
    let totalProdJam = 0, totalTenagaKerja = 0, totalOutputTK = 0;
    let totalSelisihOrder = 0, totalPuncak = 0;
    let avgPersenPenjualan = 0;

    data.forEach((row) => {
      // Support both formats
      totalEsKeluar += parseFloat(row.esKeluar || row['Es Keluar (Bal)'] || 0);
      
      // Total defects dari berbagai sumber
      const bak1 = parseFloat(row.bak1 || row['Defect Bak 1 (Bal)'] || 0);
      const bak2 = parseFloat(row.bak2 || row['Defect Bak 2 (Bal)'] || 0);
      const bak3 = parseFloat(row['Defect Bak 3 (Bal)'] || 0);
      totalDefects += (row.totalRusak || (bak1 + bak2 + bak3));
      
      totalTidakTerjual += parseFloat(row.tidakTerjual || 0);
      totalProdJam += parseFloat(row.prodJam || row['Kapasitas Mesin (Bal/Jam)'] || 0);
      totalTenagaKerja += parseFloat(row.tenagaKerja || 0);
      totalOutputTK += parseFloat(row.outputTK || 0);
      totalSelisihOrder += parseFloat(row.selisihOrder || 0);
      totalPuncak += parseFloat(row.puncak || 0);
      avgPersenPenjualan += parseFloat(row.persenPenjualan || 0);
    });

    const avgProdJam = totalProdJam / data.length;
    const avgWorkforceEff = totalTenagaKerja > 0 ? totalOutputTK / data.length : 0;
    const avgSalesRate = avgPersenPenjualan / data.length;

    return {
      totalProd: totalEsKeluar.toLocaleString(),
      totalDefects: totalDefects.toLocaleString(),
      avgProd: avgProdJam.toFixed(1),
      workforce: avgWorkforceEff.toFixed(1),
      unsold: totalTidakTerjual.toLocaleString(),
      salesRate: avgSalesRate.toFixed(1),
      orderFulfill: totalSelisihOrder.toLocaleString(),
      peakHours: totalPuncak
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
          <div className="kpi-change">gap</div>
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
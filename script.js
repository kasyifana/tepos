// ================= DATA =================
      const rawDataOriginal = [
        {
          date: "2024-05-01",
          esKeluar: 2114,
          bak1: 2,
          bak2: 2,
          totalRusak: 4,
          realisasiOrder: 2110,
          normal: 32,
          puncak: 8,
          totalBeban: 40,
          mesin: 3,
          prodJam: 53,
          kapasitas: 4803,
          tidakTerjual: 2689,
          persenPenjualan: 44,
          order: 2110,
          selisihOrder: 0,
          tenagaKerja: 28,
          outputTK: 75.4,
        },
        {
          date: "2024-05-02",
          esKeluar: 4201,
          bak1: 3,
          bak2: 3,
          totalRusak: 6,
          realisasiOrder: 4192,
          normal: 48,
          puncak: 0,
          totalBeban: 48,
          mesin: 3,
          prodJam: 87,
          kapasitas: 4803,
          tidakTerjual: 602,
          persenPenjualan: 87,
          order: 4192,
          selisihOrder: 0,
          tenagaKerja: 28,
          outputTK: 149.7,
        },
        {
          date: "2024-05-03",
          esKeluar: 3667,
          bak1: 4,
          bak2: 32,
          totalRusak: 35,
          realisasiOrder: 3740,
          normal: 45,
          puncak: 12,
          totalBeban: 57,
          mesin: 3,
          prodJam: 66,
          kapasitas: 4803,
          tidakTerjual: 1136,
          persenPenjualan: 78,
          order: 3632,
          selisihOrder: -108,
          tenagaKerja: 29,
          outputTK: 129.0,
        },
        {
          date: "2024-05-04",
          esKeluar: 3915,
          bak1: 6,
          bak2: 6,
          totalRusak: 12,
          realisasiOrder: 3903,
          normal: 50,
          puncak: 15,
          totalBeban: 65,
          mesin: 3,
          prodJam: 60,
          kapasitas: 4803,
          tidakTerjual: 888,
          persenPenjualan: 81,
          order: 3903,
          selisihOrder: 0,
          tenagaKerja: 28,
          outputTK: 139.4,
        },
        {
          date: "2024-05-05",
          esKeluar: 4036,
          bak1: 0,
          bak2: 5,
          totalRusak: 5,
          realisasiOrder: 4274,
          normal: 52,
          puncak: 15,
          totalBeban: 67,
          mesin: 3,
          prodJam: 64,
          kapasitas: 4803,
          tidakTerjual: 767,
          persenPenjualan: 89,
          order: 4031,
          selisihOrder: -243,
          tenagaKerja: 26,
          outputTK: 164.4,
        },
        {
          date: "2024-05-06",
          esKeluar: 3202,
          bak1: 2,
          bak2: 2,
          totalRusak: 4,
          realisasiOrder: 3198,
          normal: 47,
          puncak: 15,
          totalBeban: 62,
          mesin: 3,
          prodJam: 52,
          kapasitas: 4803,
          tidakTerjual: 1601,
          persenPenjualan: 67,
          order: 3198,
          selisihOrder: 0,
          tenagaKerja: 30,
          outputTK: 106.6,
        },
        {
          date: "2024-05-07",
          esKeluar: 2511,
          bak1: 3,
          bak2: 4,
          totalRusak: 7,
          realisasiOrder: 3476,
          normal: 42,
          puncak: 0,
          totalBeban: 42,
          mesin: 2,
          prodJam: 83,
          kapasitas: 4803,
          tidakTerjual: 2292,
          persenPenjualan: 72,
          order: 2504,
          selisihOrder: -972,
          tenagaKerja: 30,
          outputTK: 115.9,
        },
        {
          date: "2024-05-08",
          esKeluar: 3480,
          bak1: 2,
          bak2: 3,
          totalRusak: 5,
          realisasiOrder: 3718,
          normal: 45,
          puncak: 0,
          totalBeban: 45,
          mesin: 3,
          prodJam: 83,
          kapasitas: 4803,
          tidakTerjual: 1323,
          persenPenjualan: 77,
          order: 3475,
          selisihOrder: -243,
          tenagaKerja: 30,
          outputTK: 123.9,
        },
        {
          date: "2024-05-09",
          esKeluar: 3310,
          bak1: 2,
          bak2: 2,
          totalRusak: 4,
          realisasiOrder: 4278,
          normal: 48,
          puncak: 9,
          totalBeban: 57,
          mesin: 3,
          prodJam: 75,
          kapasitas: 4803,
          tidakTerjual: 1493,
          persenPenjualan: 89,
          order: 3306,
          selisihOrder: -972,
          tenagaKerja: 30,
          outputTK: 142.6,
        },
        {
          date: "2024-05-10",
          esKeluar: 3465,
          bak1: 3,
          bak2: 37,
          totalRusak: 40,
          realisasiOrder: 3956,
          normal: 48,
          puncak: 4,
          totalBeban: 52,
          mesin: 3,
          prodJam: 76,
          kapasitas: 4803,
          tidakTerjual: 1338,
          persenPenjualan: 82,
          order: 3460,
          selisihOrder: -496,
          tenagaKerja: 29,
          outputTK: 136.4,
        },
        {
          date: "2024-05-11",
          esKeluar: 3514,
          bak1: 2,
          bak2: 4,
          totalRusak: 6,
          realisasiOrder: 3996,
          normal: 53,
          puncak: 14,
          totalBeban: 67,
          mesin: 3,
          prodJam: 60,
          kapasitas: 4803,
          tidakTerjual: 1289,
          persenPenjualan: 83,
          order: 3507,
          selisihOrder: -489,
          tenagaKerja: 28,
          outputTK: 142.7,
        },
        {
          date: "2024-05-12",
          esKeluar: 2887,
          bak1: 0,
          bak2: 1,
          totalRusak: 1,
          realisasiOrder: 3129,
          normal: 54,
          puncak: 15,
          totalBeban: 69,
          mesin: 3,
          prodJam: 45,
          kapasitas: 4803,
          tidakTerjual: 1916,
          persenPenjualan: 65,
          order: 2886,
          selisihOrder: -243,
          tenagaKerja: 22,
          outputTK: 142.2,
        },
        {
          date: "2024-05-13",
          esKeluar: 3254,
          bak1: 4,
          bak2: 4,
          totalRusak: 8,
          realisasiOrder: 3739,
          normal: 50,
          puncak: 9,
          totalBeban: 59,
          mesin: 3,
          prodJam: 63,
          kapasitas: 4803,
          tidakTerjual: 1549,
          persenPenjualan: 78,
          order: 3246,
          selisihOrder: -493,
          tenagaKerja: 30,
          outputTK: 124.6,
        },
        {
          date: "2024-05-14",
          esKeluar: 2999,
          bak1: 4,
          bak2: 3,
          totalRusak: 7,
          realisasiOrder: 3478,
          normal: 45,
          puncak: 3,
          totalBeban: 48,
          mesin: 3,
          prodJam: 72,
          kapasitas: 4803,
          tidakTerjual: 1804,
          persenPenjualan: 72,
          order: 2992,
          selisihOrder: -486,
          tenagaKerja: 31,
          outputTK: 112.2,
        },
        {
          date: "2024-05-15",
          esKeluar: 4201,
          bak1: 2,
          bak2: 19,
          totalRusak: 21,
          realisasiOrder: 4180,
          normal: 38,
          puncak: 15,
          totalBeban: 53,
          mesin: 2,
          prodJam: 79,
          kapasitas: 4803,
          tidakTerjual: 602,
          persenPenjualan: 87,
          order: 4196,
          selisihOrder: 16,
          tenagaKerja: 31,
          outputTK: 134.8,
        },
        {
          date: "2024-05-16",
          esKeluar: 2981,
          bak1: 1,
          bak2: 16,
          totalRusak: 17,
          realisasiOrder: 2980,
          normal: 43,
          puncak: 10,
          totalBeban: 53,
          mesin: 3,
          prodJam: 56,
          kapasitas: 4803,
          tidakTerjual: 1822,
          persenPenjualan: 62,
          order: 2980,
          selisihOrder: 0,
          tenagaKerja: 32,
          outputTK: 93.1,
        },
        {
          date: "2024-05-17",
          esKeluar: 2484,
          bak1: 0,
          bak2: 30,
          totalRusak: 30,
          realisasiOrder: 2454,
          normal: 50,
          puncak: 6,
          totalBeban: 56,
          mesin: 3,
          prodJam: 44,
          kapasitas: 4803,
          tidakTerjual: 2319,
          persenPenjualan: 51,
          order: 2454,
          selisihOrder: 0,
          tenagaKerja: 29,
          outputTK: 84.6,
        },
        {
          date: "2024-05-18",
          esKeluar: 2820,
          bak1: 3,
          bak2: 2,
          totalRusak: 5,
          realisasiOrder: 2815,
          normal: 37,
          puncak: 0,
          totalBeban: 37,
          mesin: 2,
          prodJam: 76,
          kapasitas: 4803,
          tidakTerjual: 1983,
          persenPenjualan: 59,
          order: 2815,
          selisihOrder: 0,
          tenagaKerja: 27,
          outputTK: 104.3,
        },
        {
          date: "2024-05-19",
          esKeluar: 3264,
          bak1: 0,
          bak2: 0,
          totalRusak: 0,
          realisasiOrder: 3264,
          normal: 39,
          puncak: 0,
          totalBeban: 39,
          mesin: 2,
          prodJam: 84,
          kapasitas: 4803,
          tidakTerjual: 1539,
          persenPenjualan: 68,
          order: 3264,
          selisihOrder: 0,
          tenagaKerja: 22,
          outputTK: 148.4,
        },
        {
          date: "2024-05-20",
          esKeluar: 3202,
          bak1: 2,
          bak2: 0,
          totalRusak: 2,
          realisasiOrder: 3197,
          normal: 47,
          puncak: 15,
          totalBeban: 62,
          mesin: 3,
          prodJam: 52,
          kapasitas: 4803,
          tidakTerjual: 1601,
          persenPenjualan: 67,
          order: 3197,
          selisihOrder: 0,
          tenagaKerja: 27,
          outputTK: 118.4,
        },
        {
          date: "2024-05-21",
          esKeluar: 3638,
          bak1: 2,
          bak2: 2,
          totalRusak: 4,
          realisasiOrder: 3634,
          normal: 57,
          puncak: 2,
          totalBeban: 59,
          mesin: 3,
          prodJam: 62,
          kapasitas: 4803,
          tidakTerjual: 1165,
          persenPenjualan: 76,
          order: 3634,
          selisihOrder: 0,
          tenagaKerja: 28,
          outputTK: 129.8,
        },
        {
          date: "2024-05-22",
          esKeluar: 3150,
          bak1: 2,
          bak2: 1,
          totalRusak: 3,
          realisasiOrder: 3148,
          normal: 55,
          puncak: 6,
          totalBeban: 61,
          mesin: 3,
          prodJam: 52,
          kapasitas: 4803,
          tidakTerjual: 1653,
          persenPenjualan: 66,
          order: 3148,
          selisihOrder: 0,
          tenagaKerja: 31,
          outputTK: 101.5,
        },
        {
          date: "2024-05-23",
          esKeluar: 3295,
          bak1: 2,
          bak2: 2,
          totalRusak: 4,
          realisasiOrder: 3292,
          normal: 49,
          puncak: 3,
          totalBeban: 52,
          mesin: 3,
          prodJam: 63,
          kapasitas: 4803,
          tidakTerjual: 1508,
          persenPenjualan: 69,
          order: 3292,
          selisihOrder: 0,
          tenagaKerja: 31,
          outputTK: 106.2,
        },
        {
          date: "2024-05-24",
          esKeluar: 3627,
          bak1: 2,
          bak2: 7,
          totalRusak: 9,
          realisasiOrder: 3623,
          normal: 51,
          puncak: 10,
          totalBeban: 61,
          mesin: 3,
          prodJam: 59,
          kapasitas: 4803,
          tidakTerjual: 1176,
          persenPenjualan: 75,
          order: 3623,
          selisihOrder: 0,
          tenagaKerja: 31,
          outputTK: 116.9,
        },
        {
          date: "2024-05-25",
          esKeluar: 3428,
          bak1: 5,
          bak2: 2,
          totalRusak: 7,
          realisasiOrder: 3420,
          normal: 57,
          puncak: 3,
          totalBeban: 60,
          mesin: 3,
          prodJam: 57,
          kapasitas: 4803,
          tidakTerjual: 1375,
          persenPenjualan: 71,
          order: 3420,
          selisihOrder: 0,
          tenagaKerja: 30,
          outputTK: 114.0,
        },
        {
          date: "2024-05-26",
          esKeluar: 2610,
          bak1: 2,
          bak2: 2,
          totalRusak: 4,
          realisasiOrder: 3335,
          normal: 47,
          puncak: 6,
          totalBeban: 53,
          mesin: 3,
          prodJam: 63,
          kapasitas: 4803,
          tidakTerjual: 2193,
          persenPenjualan: 69,
          order: 2606,
          selisihOrder: -729,
          tenagaKerja: 25,
          outputTK: 133.4,
        },
        {
          date: "2024-05-27",
          esKeluar: 3654,
          bak1: 24,
          bak2: 8,
          totalRusak: 32,
          realisasiOrder: 4108,
          normal: 52,
          puncak: 4,
          totalBeban: 56,
          mesin: 3,
          prodJam: 73,
          kapasitas: 4803,
          tidakTerjual: 1149,
          persenPenjualan: 86,
          order: 3622,
          selisihOrder: -486,
          tenagaKerja: 29,
          outputTK: 141.7,
        },
        {
          date: "2024-05-28",
          esKeluar: 2783,
          bak1: 5,
          bak2: 0,
          totalRusak: 5,
          realisasiOrder: 3744,
          normal: 41,
          puncak: 10,
          totalBeban: 51,
          mesin: 2,
          prodJam: 73,
          kapasitas: 4803,
          tidakTerjual: 2020,
          persenPenjualan: 78,
          order: 2778,
          selisihOrder: -966,
          tenagaKerja: 30,
          outputTK: 124.8,
        },
        {
          date: "2024-05-29",
          esKeluar: 2348,
          bak1: 1,
          bak2: 6,
          totalRusak: 7,
          realisasiOrder: 2341,
          normal: 38,
          puncak: 5,
          totalBeban: 43,
          mesin: 2,
          prodJam: 54,
          kapasitas: 4803,
          tidakTerjual: 2455,
          persenPenjualan: 49,
          order: 2341,
          selisihOrder: 0,
          tenagaKerja: 32,
          outputTK: 73.2,
        },
        {
          date: "2024-05-30",
          esKeluar: 2129,
          bak1: 3,
          bak2: 0,
          totalRusak: 3,
          realisasiOrder: 2126,
          normal: 32,
          puncak: 0,
          totalBeban: 32,
          mesin: 2,
          prodJam: 66,
          kapasitas: 4803,
          tidakTerjual: 2674,
          persenPenjualan: 44,
          order: 2126,
          selisihOrder: 0,
          tenagaKerja: 31,
          outputTK: 68.6,
        },
        {
          date: "2024-05-31",
          esKeluar: 2785,
          bak1: 2,
          bak2: 2,
          totalRusak: 4,
          realisasiOrder: 3024,
          normal: 48,
          puncak: 0,
          totalBeban: 48,
          mesin: 3,
          prodJam: 63,
          kapasitas: 4803,
          tidakTerjual: 2018,
          persenPenjualan: 63,
          order: 2781,
          selisihOrder: -243,
          tenagaKerja: 33,
          outputTK: 91.6,
        },
      ];

      let charts = [];
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

      const rawData = sanitizeData(rawDataOriginal);
      // Initialize dates
      startDate.value = rawData[0].date;
      endDate.value = rawData[rawData.length - 1].date;
      startDate.min = endDate.min = rawData[0].date;
      startDate.max = endDate.max = rawData[rawData.length - 1].date;

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
        charts.forEach((c) => c.destroy());
        charts = [];

        let filtered = rawData.filter(
          (d) => d.date >= startDate.value && d.date <= endDate.value,
        );
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

        // Create trend charts (simplified - using dummy trending data)
        const trendOEEData = filtered.map(
          (_, i) => metrics.oee + (Math.random() - 0.5) * 10,
        );
        const trendAvailData = filtered.map(
          (_, i) => metrics.availability + (Math.random() - 0.5) * 10,
        );
        const trendPerfData = filtered.map(
          (_, i) => metrics.performance + (Math.random() - 0.5) * 10,
        );
        const trendQualData = filtered.map(
          (_, i) => metrics.quality + (Math.random() - 0.5) * 5,
        );

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
          // Downtime = 24 hours * mesin - total beban
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
            // Overview shows all categories combined
            filtered.forEach((d, i) => {
              // Normal load
              if (d.normal > 0) {
                const seg = document.createElement("div");
                seg.className = "status-segment";
                seg.style.width = (d.normal / maxBeban) * 3 + "%";
                seg.style.background = "#10B981";
                seg.title = `Day ${i + 1}: Normal ${d.normal}h`;
                bar.appendChild(seg);
              }

              // Peak load
              if (d.puncak > 0) {
                const seg = document.createElement("div");
                seg.className = "status-segment";
                seg.style.width = (d.puncak / maxBeban) * 3 + "%";
                seg.style.background = "#FCD34D";
                seg.title = `Day ${i + 1}: Peak ${d.puncak}h`;
                bar.appendChild(seg);
              }

              // Tank 1 defects
              if (d.bak1 > 0) {
                const seg = document.createElement("div");
                seg.className = "status-segment";
                seg.style.width = "0.5%";
                seg.style.background = "#FB923C";
                seg.title = `Day ${i + 1}: Tank1 ${d.bak1} units`;
                bar.appendChild(seg);
              }

              // Tank 2 defects
              if (d.bak2 > 0) {
                const seg = document.createElement("div");
                seg.className = "status-segment";
                seg.style.width = d.bak2 > 20 ? "1.5%" : "0.5%";
                seg.style.background = "#EF4444";
                seg.title = `Day ${i + 1}: Tank2 ${d.bak2} units`;
                bar.appendChild(seg);
              }

              // Idle time
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
            // Individual category rows
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

        // Update distribution panel
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
        // Update hours/units
        document.getElementById("distNormal").textContent =
          totalNormal + " hrs";
        document.getElementById("distPeak").textContent = totalPuncak + " hrs";
        document.getElementById("distBak1").textContent = totalBak1 + " units";
        document.getElementById("distBak2").textContent = totalBak2 + " units";
        document.getElementById("distIdle").textContent =
          Math.round(totalIdle) + " hrs";

        // Update day counts (how many days had this event)
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
        document.getElementById("distPeakCount").textContent =
          peakDays + " days";
        document.getElementById("distBak1Count").textContent =
          bak1Days + " days";
        document.getElementById("distBak2Count").textContent =
          bak2Days + " days";
        document.getElementById("distIdleCount").textContent =
          idleDays + " days";
      }

      // Event listeners
      startDate.addEventListener("change", updateDashboard);
      endDate.addEventListener("change", updateDashboard);

      // Initialize
      updateDashboard();

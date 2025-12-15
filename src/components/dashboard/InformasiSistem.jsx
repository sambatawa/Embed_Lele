"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState, useRef } from "react";
import { ChevronDown, Check } from "lucide-react";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function InformasiSistem({
  formulas = [],
  formulaData = {},
  selected = "",
  onSelect = () => {},
  overallDistribution = null,
}) {
  const [current, setCurrent] = useState(() => {
    const formulaNames = formulas.map(f => typeof f === 'string' ? f : f.name);
    return selected || (formulaNames.length ? formulaNames[0] : "");
  });

  useEffect(() => {
    if (selected && selected !== current) setCurrent(selected);
  }, [selected]);

  const formulaNames = useMemo(() => 
    formulas.map(f => typeof f === 'string' ? f : f.name),
    [formulas]
  );

  const handleChange = (name) => {
    setCurrent(name);
    onSelect(name);
  };

  const lineSeries = useMemo(() => {
    const colors = ["#6C5F57", "#A58F85", "#CBBFB4", "#D8CDC3", "#E7DFD7", "#D4A574", "#FAF6F1"];
    
    return formulaNames.map((formulaName, idx) => {
      const seed = formulaName.split("").reduce((s, ch) => s + ch.charCodeAt(0), 0);
      const values = Array.from({ length: 24 }, (_, h) => {
        const base = Math.floor(Math.abs(Math.sin((h + seed / 10) * 0.7)) * 20) + 2;
        const mod =
          h >= 7 && h <= 9
            ? 8
            : h >= 12 && h <= 14
            ? 12
            : h >= 18 && h <= 20
            ? 10
            : 0;
        return base + Math.floor(mod * Math.abs(Math.cos((seed + h) / 10)));
      });
      return { 
        name: formulaName, 
        data: values,
        color: colors[idx % colors.length]
      };
    });
  }, [formulaNames]);

  const lineOptions = useMemo(
    () => ({
      chart: {
        id: "clicks-line",
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      stroke: {
        curve: "smooth",
        width: 3,
      },
      markers: {
        size: 4,
        strokeWidth: 2,
      },
      xaxis: {
        categories: Array.from({ length: 24 }, (_, i) => `${i}`),
        labels: { style: { fontSize: "12px", colors: "#6C5F57" } },
        title: { text: "Jam", style: { fontSize: "13px", color: "#6C5F57" } },
      },
      yaxis: {
        labels: { style: { fontSize: "12px", colors: "#6C5F57" } },
      },
      grid: {
        borderColor: "#D8D0C8",
        strokeDashArray: 4,
      },
      tooltip: { theme: "light" },
      legend: { 
        show: true, 
        position: "bottom",
        fontSize: "11px",
        labels: { colors: "#6C5F57" }
      },
      colors: ["#6C5F57", "#A58F85", "#CBBFB4", "#D8CDC3", "#E7DFD7", "#D4A574", "#FAF6F1"]
    }),
    []
  );

  const doughnutSeries = useMemo(() => {
    if (overallDistribution) return Object.values(overallDistribution);
    return formulas.map((f, idx) => 20 + (idx % 3) * 5);
  }, [overallDistribution, formulas]);

  const doughnutLabels = useMemo(
    () => (overallDistribution ? Object.keys(overallDistribution) : formulaNames),
    [overallDistribution, formulaNames]
  );

  const doughnutOptions = useMemo(
    () => ({
      chart: { toolbar: { show: false } },
      labels: doughnutLabels,
      legend: { show: false },

      plotOptions: {
        pie: {
          donut: { size: "72%" },
        },
      },

      colors: [
        "#6C5F57",
        "#A58F85",
        "#CBBFB4",
        "#D8CDC3",
        "#E7DFD7",
        "#D4A574",
        "#FAF6F1"
      ],

      tooltip: { theme: "light" },
    }),
    [doughnutLabels]
  );

  return (
    <section className="p-4 rounded-2xl bg-transparent backdrop-blur-sm shadow-sm border border-white/20 relative overflow-hidden">

      <div className="mb-4 relative z-10">
        <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-lg hover:bg-white/30 transition-all duration-300">
          <h2 className="text-lg font-semibold text-[#6C5F57] mb-2">Informasi {current}</h2>
    
          <p className="text-sm text-[#7d6f66]">
            Formula {current} dirancang dengan kandungan nutrisi optimal untuk mendukung pertumbuhan dan kesehatan ikan. Komposisi seimbang antara protein, lemak, dan serat memastikan hasil ternak yang maksimal.
          </p>
    
          <div className="mt-4 text-sm grid grid-cols-3 gap-4">
            <div className="text-center p-2 bg-white/30 rounded-lg">
              <p className="font-semibold text-[#6C5F57]">Protein</p>
              <p className="text-[#7d6f66]">{formulas.find(f => f.name === current)?.protein || 0}g</p>
            </div>
            <div className="text-center p-2 bg-white/30 rounded-lg">
              <p className="font-semibold text-[#6C5F57]">Berat Pelet</p>
              <p className="text-[#7d6f66]">{formulas.find(f => f.name === current)?.berat_pelet || 0}g</p>
            </div>
            <div className="text-center p-2 bg-white/30 rounded-lg">
              <p className="font-semibold text-[#6C5F57]">Kategori</p>
              <p className="text-[#7d6f66]">{formulas.find(f => f.name === current)?.category || '-'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 relative z-10">
        <div className="w-full lg:w-[70%] rounded-lg p-2 bg-white/20 backdrop-blur-md shadow-lg border border-white/20 hover:bg-white/30 transition-all duration-300 hover:shadow-xl hover:border-white/30">
          <h3 className="text-lg font-semibold text-[#6C5F57] mb-2">Grafik Produksi per Jam</h3>
          <div className="h-72 lg:h-[360px]">
            <Chart
              options={lineOptions}
              series={lineSeries}
              type="line"
              height={"100%"}
            />
          </div>
        </div>

        <div className="w-full lg:w-[30%] flex flex-col gap-4">
          <div className="rounded-lg p-3 bg-white/20 backdrop-blur-md shadow-lg border border-white/20 hover:bg-white/30 transition-all duration-300 hover:shadow-xl hover:border-white/30">
            <h3 className="text-lg font-semibold text-[#6C5F57] mb-2">Distribusi Formula</h3>
            <div className="h-48 lg:h-[360px]">
              <Chart
                options={doughnutOptions}
                series={doughnutSeries}
                type="donut"
                height={"100%"}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

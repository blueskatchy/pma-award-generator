import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

/* Metric Card */
export function MetricCard({ title, value }) {
  return (
    <div className="bg-white border-b-4 border-primary rounded-lg shadow-md p-5 hover:shadow-lg transition duration-300">
      <h3 className="font-semibold uppercase text-sm text-gray-500">
        {title}
      </h3>
      <p className="font-bold text-2xl mt-2">{value}</p>
    </div>
  );
}

/* Chart Card */
export function ChartCard({ title }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chartInstance = new Chart(chartRef.current, {
      type: "bar",
      data: {
        labels: ["A", "B", "C"],
        datasets: [
          {
            label: "Score",
            data: [12, 19, 7],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    return () => chartInstance.destroy();
  }, []);

  return (
    <div className="bg-white p-5 rounded-lg shadow h-72">
      <h3 className="text-xl font-bold text-gray-700 mb-4 text-center tracking-wide">
        {title}
      </h3>
      <div className="h-52">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
}

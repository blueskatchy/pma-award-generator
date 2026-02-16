import React from "react";
import { MetricCard, ChartCard } from "../components/DashboardComponents";

export default function Dashboard() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const metrics = [
    { title: "Total Graduates", value: "249" },
    { title: "Latin", value: "249" },
    { title: "Saber", value: "2" },
    { title: "Awards", value: "152" },
    { title: "Plaque", value: "7" },
    { title: "Streamer", value: "3" },
  ];

  const chartTitles = [
    "ALPHA",
    "BRAVO",
    "CHARLIE",
    "DELTA",
  ];

  return (
    <div className="bg-surface p-7 w-full text-gray-600">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">
          Welcome back!
        </h1>
        <span className="text-primary text-lg">
          {currentDate}
        </span>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {metrics.map((item, index) => (
          <MetricCard key={index} {...item} />
        ))}
      </div>

    </div>
  );
}

import React from "react";
import LatinTable from "../components/LatinTable";
import exportOfficialPDF from "../config/exportOfficialPDF"; 

const Latin = () => {
  const cumLaude = [
    { rank: 1, name: "Juan Dela Cruz", grade: 90 },
    { rank: 2, name: "Maria Santos", grade: 89 },
  ];

  const magnaCumLaude = [
    { rank: 1, name: "Jose Reyes", grade: 94 },
    { rank: 2, name: "Ana Garcia", grade: 93 },
  ];

  const summaCumLaude = [
    { rank: 1, name: "Mark Villanueva", grade: 98 },
    { rank: 2, name: "Claire Mendoza", grade: 97 },
  ];

  const handleExportPDF = () => {
    const sections = [
      { title: "CUM LAUDE", data: cumLaude },
      { title: "MAGNA CUM LAUDE", data: magnaCumLaude },
      { title: "SUMMA CUM LAUDE", data: summaCumLaude },
    ];

    exportOfficialPDF({
      pageTitle: "Latin Honors",
      sections,
      fileName: "latin-honors",
    });
  };

  return (
    <div className="bg-surface p-7 md:p-16 w-full min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-700">
          Latin Honors
        </h1>

        <button
          onClick={handleExportPDF}
          className="text-gray-600 hover:text-gray-900 underline font-semibold transition"
        >
          Export PDF
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <LatinTable title="CUM LAUDE" data={cumLaude} />
        <LatinTable title="MAGNA CUM LAUDE" data={magnaCumLaude} />
        <LatinTable title="SUMMA CUM LAUDE" data={summaCumLaude} />
      </div>
    </div>
  );
};

export default Latin;
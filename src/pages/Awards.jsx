import React, { useEffect, useState } from "react";
import TableLayout from "../components/TableLayout";
import exportOfficialPDF from "../config/exportOfficialPDF";

const Awards = () => {
  // State for each award (currently only Strongest Cadet)
  const [strongestCadet, setStrongestCadet] = useState([]);

  useEffect(() => {
    // Fetch Strongest Cadet
    fetch("http://localhost:3001/api/awards")
      .then(res => res.json())
      .then(data => {
        // Wrap single object in array if exists
        const cadetArray = data.strongestCadet ? [data.strongestCadet] : [];

        // Format rank and grade
        const formatted = cadetArray.map((s, index) => ({
          rank: index + 1,
          name: s.name,
          grade: s.cgpa.toFixed(3)
        }));

        setStrongestCadet(formatted);
      })
      .catch(error => console.error("Error fetching awards:", error));
  }, []);

  // Define all award sections
  const sections = [
    { title: "PHYSICAL PROFICENCY AWARD", data: [] },
    { title: "STRONGEST CADET AWARD", data: strongestCadet },
    { title: "COURSE EXCELLENCE AWARD", data: [] },
    { title: "DISTINGUISHED CADET (STARMAN)", data: [] },
    { title: "AGFO, INC", data: [] },
    { title: "GEN. ANTONIO LUNA", data: [] },
    { title: "JUSMAG", data: [] },
    { title: "JOURNALISM", data: [] },
    { title: "SPANISH ARMED FORCES", data: [] },
    { title: "ACADEMIC GROUP AWARD", data: [] },
    { title: "TACTICS GROUP AWARD", data: [] }
  ];

  // Export PDF handler
  const handleExportPDF = () => {
    exportOfficialPDF({
      pageTitle: "Awards",
      sections,
      fileName: "awards"
    });
  };

  return (
    <div className="bg-surface p-7 md:p-16 w-full min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-700">
          Awards
        </h1>

        <button
          onClick={handleExportPDF}
          className="text-gray-600 hover:text-gray-900 underline font-semibold transition"
        >
          Export PDF
        </button>
      </div>

      <TableLayout
        pageTitle="Awards"
        pageName="awards"
        sections={sections}
      />
    </div>
  );
};

export default Awards;
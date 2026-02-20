import React, { useEffect, useState } from "react";
import LatinTable from "../components/LatinTable";
import exportOfficialPDF from "../config/exportOfficialPDF"; 

const Latin = () => {
  const [cumLaude, setCumLaude] = useState([]);
  const [magnaCumLaude, setMagnaCumLaude] = useState([]);
  const [summaCumLaude, setSummaCumLaude] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/latin-honors")
      .then(res => res.json())
      .then(data => {
        const addRank = arr =>
          arr
            .sort((a, b) => b.cgpa - a.cgpa)
            .map((student, index) => ({
              rank: index + 1,
              name: student.name,
              grade: student.cgpa.toFixed(3)
            }));

        setSummaCumLaude(addRank(data.summaCumLaude || []));
        setMagnaCumLaude(addRank(data.magnaCumLaude || []));
        setCumLaude(addRank(data.cumLaude || []));
      })
      .catch(error => console.error("Error fetching Latin honors:", error));
  }, []);

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
      <h1 className="text-2xl md:text-3xl font-bold text-gray-700">Latin Honors</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <LatinTable title="CUM LAUDE" data={cumLaude} />
        <LatinTable title="MAGNA CUM LAUDE" data={magnaCumLaude} />
        <LatinTable title="SUMMA CUM LAUDE" data={summaCumLaude} />
      </div>
    </div>
  );
};

export default Latin;
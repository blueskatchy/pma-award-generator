import React, { useEffect, useState } from "react";
import LatinTable from "../components/LatinTable"; // reuse this table component
import exportOfficialPDF from "../config/exportOfficialPDF";

const Dashboard = () => {
  const [deansList, setDeansList] = useState([]);
  const [commandantsList, setCommandantsList] = useState([]);
  const [militaryPrecedenceList, setMilitaryPrecedenceList] = useState([]);

  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  useEffect(() => {
    fetch("http://localhost:3001/api/dashboard-lists")
      .then(res => res.json())
      .then(data => {
        const addRank = arr =>
          arr.map((student, index) => ({
            rank: index + 1,
            name: student.name,
            grade: student.cgpa.toFixed(3),
          }));

        setDeansList(addRank(data.deansList || []));
        setCommandantsList(addRank(data.commandantsList || []));
        setMilitaryPrecedenceList(addRank(data.militaryPrecedenceList || []));
      })
      .catch(error =>
        console.error("Error fetching dashboard lists:", error)
      );
  }, []);

  const handleExportPDF = () => {
    const sections = [
      { title: "DEAN'S LIST", data: deansList },
      { title: "COMMANDANT'S LIST", data: commandantsList },
      { title: "MILITARY PRECEDENCE LIST", data: militaryPrecedenceList },
    ];

    exportOfficialPDF({
      pageTitle: "Dashboard Lists",
      sections,
      fileName: "dashboard-lists",
    });
  };

  return (
    <div className="bg-surface p-7 md:p-16 w-full min-h-screen text-gray-600">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-700">
            Welcome back!
          </h1>
          <span className="text-gray-700 text-lg">{currentDate}</span>
        </div>

        <button
          onClick={handleExportPDF}
          className="text-gray-600 hover:text-gray-900 underline font-semibold transition"
        >
          Export PDF
        </button>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <LatinTable title="DEAN'S LIST" data={deansList} />
        <LatinTable title="COMMANDANT'S LIST" data={commandantsList} />
        <LatinTable title="MILITARY PRECEDENCE LIST" data={militaryPrecedenceList} />
      </div>

    </div>
  );
};

export default Dashboard;
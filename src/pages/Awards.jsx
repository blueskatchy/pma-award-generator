import React, { useEffect, useState } from "react";
import TableLayout from "../components/TableLayout";
import exportOfficialPDF from "../config/exportOfficialPDF";

const Awards = () => {
  const [strongestCadet, setStrongestCadet] = useState([]);
  const [agfoAward, setAgfoAward] = useState([]);
  const [genAntLuna, setGenAntLuna] = useState([]);
  const [journalismAward, setJournalismAward] = useState([]);
  const [spanishAward, setSpanishAward] = useState([]);
  const [academicAward, setAcademicAward] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/awards")
      .then(res => res.json())
      .then(data => {
        // Wrap single objects in arrays
        const cadetArray = data.strongestCadet ? [data.strongestCadet] : [];
        const agfoArray = data.agfoAward ? [data.agfoAward] : [];
        const genAntArray = data.genAntLuna ? [data.genAntLuna] : [];
        const journalismArray = data.journalismAward ? [data.journalismAward] : [];
        const spanishArray = data.spanishAward ? [data.spanishAward] : [];
        const academicArray = data.academicAward ? [data.academicAward] : [];

        // Format each award
        const formattedStrongest = cadetArray.map((s, index) => ({
          rank: index + 1,
          name: s.name,
          grade: Number(s.cgpa).toFixed(3)
        }));

        const formattedAgfo = agfoArray.map((s, index) => ({
          rank: index + 1,
          name: s.name,
          grade: Number(s.cgpa).toFixed(3)
        }));

        const formattedGenAnt = genAntArray.map((s, index) => ({
          rank: index + 1,
          name: s.name,
          grade: Number(s.cgpa).toFixed(3)
        }));

        const formattedJournal = journalismArray.map((s, index) => ({
          rank: index + 1,
          name: s.name,
          grade: Number(s.cgpa).toFixed(3)
        }));

        const formattedSpanish = spanishArray.map((s, index) => ({
          rank: index + 1,
          name: s.name,
          grade: Number(s.cgpa).toFixed(3)
        }));

        const formattedAcademic = academicArray.map((s, index) => ({
          rank: index + 1,
          name: s.name,
          grade: Number(s.cgpa).toFixed(3)
        }));

        // Set state
        setStrongestCadet(formattedStrongest);
        setAgfoAward(formattedAgfo);
        setGenAntLuna(formattedGenAnt);
        setJournalismAward(formattedJournal);
        setSpanishAward(formattedSpanish);
        setAcademicAward(formattedAcademic);
      })
      .catch(error => console.error("Error fetching awards:", error));
  }, []);

  // Define all award sections
  const sections = [
    { title: "PHYSICAL PROFICIENCY AWARD", data: [] },
    { title: "STRONGEST CADET AWARD", data: strongestCadet },
    { title: "COURSE EXCELLENCE AWARD", data: [] },
    { title: "DISTINGUISHED CADET (STARMAN)", data: [] },
    { title: "AGFO, INC", data: agfoAward },
    { title: "GEN. ANTONIO LUNA", data: genAntLuna },
    { title: "JUSMAG", data: [] },
    { title: "JOURNALISM", data: journalismAward },
    { title: "SPANISH ARMED FORCES", data: spanishAward },
    { title: "ACADEMIC GROUP AWARD", data: academicAward },
    { title: "TACTICS GROUP AWARD", data: [] }
  ];

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
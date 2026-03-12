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
        // Convert each award array into {rank, name, grade}
        const formatStudents = (students) => {
          if (!students) return [];
          return (Array.isArray(students) ? students : [students]).map((s, index) => ({
            rank: index + 1,
            name: s.name,
            grade: Number(s.cgpa).toFixed(3)
          }));
        };

        setStrongestCadet(formatStudents(data.strongestCadet));
        setAgfoAward(formatStudents(data.agfoAward));
        setGenAntLuna(formatStudents(data.genAntLuna));
        setJournalismAward(formatStudents(data.journalismAward));
        setSpanishAward(formatStudents(data.spanishAward));
        setAcademicAward(formatStudents(data.academicAward));
      })
      .catch(error => console.error("Error fetching awards:", error));
  }, []);

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
    <TableLayout
      pageTitle="Awards"
      pageName="saber"
      sections={sections}
      clickableNames={true}
    />
  );
};

export default Awards;
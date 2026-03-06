// /src/pages/Plaque.jsx
import React, { useEffect, useState } from "react";
import TableLayout from "../components/TableLayout";

const Plaque = () => {
  const [infoTech, setInfoTech] = useState([]);
  const [manage, setManage] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/plaque")
      .then(res => res.json())
      .then(data => {
        // Wrap single objects in arrays
        const infoTechArray = data.infoTechPlq ? [data.infoTechPlq] : [];
        const manageArray = data.managePlq ? [data.managePlq] : [];

        // Format data for table
        const formattedInfoTech = infoTechArray.map((s, i) => ({
          rank: i + 1,
          name: s.name,
          grade: Number(s.cgpa).toFixed(3)
        }));
        const formattedManage = manageArray.map((s, i) => ({
          rank: i + 1,
          name: s.name,
          grade: Number(s.cgpa).toFixed(3)
        }));

        // Set states correctly
        setInfoTech(formattedInfoTech);
        setManage(formattedManage);
      })
      .catch(err => console.error("Error fetching plaque awards:", err));
  }, []);

  const sections = [
    { title: "INFORMATION TECH.", data: infoTech },
    { title: "MANAGEMENT", data: manage },
    { title: "MATHEMATICS", data: [] },
    { title: "NATURAL SCIENCES", data: [] },
    { title: "HUMANITIES", data: [] },
    { title: "SOCIAL SCIENCES", data: [] },
    { title: "NATIONAL SECURITY STUDIES", data: [] },
    { title: "ARMY PROFESSIONAL COURSES", data: [] },
    { title: "NAVY PROFESSIONAL", data: [] },
    { title: "AIR FORCE PROFESSIONAL", data: [] },
    { title: "DEPT. OF LEADERSHIP", data: [] },
    { title: "DEPT. OF TACTICAL OFFICERS", data: [] },
    { title: "SPORTS AND DEV. UNIT", data: [] }
  ];

  return (
    <TableLayout
      pageTitle="Plaque Awards"
      pageName="plaque"
      sections={sections}
    />
  );
};

export default Plaque;
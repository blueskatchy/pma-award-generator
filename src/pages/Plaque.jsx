// /src/pages/Plaque.jsx
import React, { useEffect, useState } from "react";
import TableLayout from "../components/TableLayout";

const Plaque = () => {

  const [infoTech, setInfoTech] = useState([]);
  const [manage, setManage] = useState([]);
  const [math, setMath] = useState([]);
  const [natSci, setNatSci] = useState([]);
  const [hum, setHum] = useState([]);
  const [socSci, setSocSci] = useState([]);
  const [natSec, setNatSec] = useState([]);
  const [army, setArmy] = useState([]);
  const [navy, setNavy] = useState([]);
  const [airforce, setAirforce] = useState([]);
  const [leadership, setLeadership] = useState([]);
  const [tactical, setTactical] = useState([]);
  const [sports, setSports] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/plaque")
      .then(res => res.json())
      .then(data => {

        const formatData = (student) => {
          const arr = student ? [student] : [];
          return arr.map((s, i) => ({
            rank: i + 1,
            name: s.name,
            grade: Number(s.cgpa).toFixed(3)
          }));
        };

        setInfoTech(formatData(data.infoTechPlq));
        setManage(formatData(data.managePlq));
        setMath(formatData(data.mathPlq));
        setNatSci(formatData(data.natSciPlq));
        setHum(formatData(data.humPlq));
        setSocSci(formatData(data.socSciPlq));
        setNatSec(formatData(data.natSecPlq));
        setArmy(formatData(data.armyPlq));
        setNavy(formatData(data.navyPlq));
        setAirforce(formatData(data.airforcePlq));
        setLeadership(formatData(data.leadershipPlq));
        setTactical(formatData(data.tacticalPlq));
        setSports(formatData(data.sportsPlq));

      })
      .catch(err => console.error("Error fetching plaque awards:", err));
  }, []);

  const sections = [
    { title: "INFORMATION TECH.", data: infoTech },
    { title: "MANAGEMENT", data: manage },
    { title: "MATHEMATICS", data: math },
    { title: "NATURAL SCIENCES", data: natSci },
    { title: "HUMANITIES", data: hum },
    { title: "SOCIAL SCIENCES", data: socSci },
    { title: "NATIONAL SECURITY STUDIES", data: natSec },
    { title: "ARMY PROFESSIONAL COURSES", data: army },
    { title: "NAVY PROFESSIONAL", data: navy },
    { title: "AIR FORCE PROFESSIONAL", data: airforce },
    { title: "DEPT. OF LEADERSHIP", data: leadership },
    { title: "DEPT. OF TACTICAL OFFICERS", data: tactical },
    { title: "SPORTS AND DEV. UNIT", data: sports }
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
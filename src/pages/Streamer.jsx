import React, { useState } from "react";
import TableLayout from "../components/TableLayout";

const COMPANIES = [
  { label: "ALPHA", value: "A" },
  { label: "BRAVO", value: "B" },
  { label: "CHARLIE", value: "C" },
  { label: "DELTA", value: "D" },
  { label: "ECHO", value: "E" },
  { label: "FOXTROT", value: "F" },
  { label: "GOLF", value: "G" },
  { label: "HAWKS", value: "H" }
];

const Streamer = () => {
  const [supCup, setSupCup] = useState("");
  const [deanCup, setDeanCup] = useState("");
  const [comCup, setComCup] = useState("");
  const [closeOrderCompany, setCloseOrderCompany] = useState("");
  const [juradoCompany, setJuradoCompany] = useState("");
  const [milTactCup, setMilTactCup] = useState("");

  // Top cadets (for main table)
  const [supCupData, setSupCupData] = useState([]);
  const [deanCupData, setDeanCupData] = useState([]);
  const [comCupData, setComCupData] = useState([]);
  const [closeOrderData, setCloseOrderData] = useState([]);
  const [juradoData, setJuradoData] = useState([]);
  const [milTactData, setMilTactData] = useState([]);

  // Full cadets (for See More modal)
  const [supCupFull, setSupCupFull] = useState([]);
  const [deanCupFull, setDeanCupFull] = useState([]);
  const [comCupFull, setComCupFull] = useState([]);
  const [closeOrderFull, setCloseOrderFull] = useState([]);
  const [juradoFull, setJuradoFull] = useState([]);
  const [milTactFull, setMilTactFull] = useState([]);

  const fetchCompanyCadets = async (company, setTop, setFull) => {
    if (!company) {
      setTop([]);
      setFull([]);
      return;
    }

    try {
      const res = await fetch(`http://localhost:3001/api/company/${company}`);
      const data = await res.json();

      
      const mappedData = data.map(cadet => ({
        rank: cadet.rank,
        afpsn: cadet.afpsn,
        name: cadet.name,
        grade: parseFloat(cadet.cgpa).toFixed(3), 
      }));

      setFull(mappedData);       
      setTop(mappedData.slice(0, 1));
    } catch (err) {
      console.error("Failed to fetch cadets:", err);
    }
  };

  const CompanyDropdown = ({ value, onChange, setTop, setFull }) => (
    <select
      value={value}
      onChange={(e) => {
        const company = e.target.value;
        onChange(company);
        fetchCompanyCadets(company, setTop, setFull);
      }}
      className="ml-2 border border-gray-300 rounded-md px-2 py-1 text-sm text-gray-700"
    >
      <option value="">Select Company</option>
      {COMPANIES.map((c) => (
        <option key={c.value} value={c.value}>
          {c.label}
        </option>
      ))}
    </select>
  );

  const sections = [
    { title: "SUP'S CUP", data: supCupData, fullData: supCupFull, titleExtra: <CompanyDropdown value={supCup} onChange={setSupCup} setTop={setSupCupData} setFull={setSupCupFull} /> },
    { title: "DEAN'S CUP", data: deanCupData, fullData: deanCupFull, titleExtra: <CompanyDropdown value={deanCup} onChange={setDeanCup} setTop={setDeanCupData} setFull={setDeanCupFull} /> },
    { title: "COMMANDANT'S CUP", data: comCupData, fullData: comCupFull, titleExtra: <CompanyDropdown value={comCup} onChange={setComCup} setTop={setComCupData} setFull={setComCupFull} /> },
    { title: "CLOSE ORDER DRILL TROPHY", data: closeOrderData, fullData: closeOrderFull, titleExtra: <CompanyDropdown value={closeOrderCompany} onChange={setCloseOrderCompany} setTop={setCloseOrderData} setFull={setCloseOrderFull} /> },
    { title: "JURADO CUP", data: juradoData, fullData: juradoFull, titleExtra: <CompanyDropdown value={juradoCompany} onChange={setJuradoCompany} setTop={setJuradoData} setFull={setJuradoFull} /> },
    { title: "MILITARY TACTICS CUP", data: milTactData, fullData: milTactFull, titleExtra: <CompanyDropdown value={milTactCup} onChange={setMilTactCup} setTop={setMilTactData} setFull={setMilTactFull} /> },
  ];

  return (
    <TableLayout
      pageTitle="Streamer Group Awards"
      pageName="streamer" 
      sections={sections}
      clickableNames={false}
    />
  );
};

export default Streamer;
import React, { useState } from "react";
import TableLayout from "../components/TableLayout";

const COMPANIES = ["ALPHA", "BRAVO", "CHARLIE", "DELTA", "ECHO", "FOXTROT", "GOLF", "HAWKS"];

const Streamer = () => {
  const [closeOrderCompany, setCloseOrderCompany] = useState("");
  const [juradoCompany, setJuradoCompany] = useState("");

  const CompanyDropdown = ({ value, onChange }) => (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="ml-2 border border-gray-300 rounded-md px-2 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
    >
      <option value="">Select Company</option>
      {COMPANIES.map((c) => (
        <option key={c} value={c}>{c}</option>
      ))}
    </select>
  );

  const sections = [
    {
      title: "SUP'S CUP",
      data: [],
    },
    {
      title: "DEAN'S CUP AND STRM",
      data: [],
    },
    {
      title: "COMMANDANT'S CUP AND STRM",
      data: [],
    },
    {
      title: "CLOSE ORDER DRILL TROPHY AND STRM",
      data: [],
      titleExtra: <CompanyDropdown value={closeOrderCompany} onChange={setCloseOrderCompany} />,
    },
    {
      title: "JURADO CUP AND STRM",
      data: [],
      titleExtra: <CompanyDropdown value={juradoCompany} onChange={setJuradoCompany} />,
    },
    {
      title: "MILITARY TACTICS CUP AND STRM",
      data: [],
    },
  ];

  return (
    <TableLayout
      pageTitle="Streamer Group Awards"
      pageName="streamer"
      sections={sections}
    />
  );
};

export default Streamer;
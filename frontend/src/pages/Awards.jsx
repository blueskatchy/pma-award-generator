import React from "react";
import TableLayout from "../components/TableLayout";

const Awards = () => {
  const sections = [
    {
      title: "DISTNGUISHED CADET (STARMAN)",
      data: [],
    },
    {
      title: "AGFO, INC",
      data: [],
    },
    {
      title: "GEN. ANTONIO LUNA",
      data: [],
    },
     {
      title: "JUSMAG",
      data: [],
    },
     {
      title: "JOURNALISM",
      data: [],
    },
     {
      title: "SPANISH ARMRED FORCES",
      data: [],
    },
     {
      title: "ACADEMIC GROUP AWARD",
      data: [],
    },
     {
      title: "TACTICS GROUP AWARD",
      data: [],
    },
  ];

  return (
    <TableLayout
      pageTitle="Awards"
      sections={sections}
    />
  );
};

export default Awards;

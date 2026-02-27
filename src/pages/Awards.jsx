import React from "react";
import TableLayout from "../components/TableLayout";

const Awards = () => {
  const sections = [
    {
      title: "PHYSICAL PROFICENCY AWARD",
      data: [],
    },
    {
      title: "STRONGEST CADET AWARD",
      data: [],
    },
    {
      title: "COURSE EXCELLENCE AWARD",
      data: [],
    },
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
            pageName="awards"
      sections={sections}
    />
  );
};

export default Awards;
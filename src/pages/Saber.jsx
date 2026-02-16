import React from "react";
import TableLayout from "../components/TableLayout";

const Saber = () => {
  const sections = [
    {
      title: "PRESIDENTIAL",
      data: [],
    },
    {
      title: "VICE-PRESIDENTIAL",
      data: [],
    },
    {
      title: "SECREATARY OF NATIONAL DEFENSE",
      data: [],
    },
    {
      title: "CHIEF OF STAFF",
      data: [],
    },
    {
      title: "PHILIPPINE ARMY SABER",
      data: [],
    },
    {
      title: "PHILIPPINE NAVY SABER",
      data: [],
    },
    {
      title: "PHILIPPINE AIR FORCE SABER",
      data: [],
    },
    {
      title: "CHIEF JUSTICE SABER",
      data: [],
    },
    {
      title: "AGUINALDO SABER",
      data: [],
    },
    {
      title: "ATHLETIC SABER",
      data: [],
    },
  ];

  return (
    <TableLayout
      pageTitle="Saber Awards"
      sections={sections}
    />
  );
};

export default Saber;

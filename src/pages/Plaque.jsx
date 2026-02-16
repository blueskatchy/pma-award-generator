import React from "react";
import TableLayout from "../components/TableLayout";

const Plaque = () => {
  const sections = [
    {
      title: "PRESIDENTIAL SABER",
      data: [],
    },
    {
      title: "VICE PRESIDENTIAL SABER",
      data: [],
    },
  ];

  return (
    <TableLayout
      pageTitle="Plaque Awards"
      sections={sections}
    />
  );
};

export default Plaque;

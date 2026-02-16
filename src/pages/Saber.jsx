import React from "react";
import TableLayout from "../components/TableLayout";

const Saber = () => {
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
      pageTitle="Saber Awards"
      sections={sections}
    />
  );
};

export default Saber;

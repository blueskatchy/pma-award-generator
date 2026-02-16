import React from "react";
import TableLayout from "../components/TableLayout";

const Streamer = () => {
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
      pageTitle="Streamer Group Awards"
      sections={sections}
    />
  );
};

export default Streamer;

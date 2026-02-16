import React from "react";
import TableLayout from "../components/TableLayout";

const Streamer = () => {
  const sections = [
    {
      title: "TACTICS GROUP AWARD",
      data: [],
    },
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
    },
     {
      title: "JURADO CUP AND STRM",
      data: [],
    },
    {
      title: "MILITARY TACTICS CUP AND STRM",
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

import React from "react";
import TableLayout from "../components/TableLayout";

const Awards = () => {
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
      pageTitle="Awards"
      sections={sections}
    />
  );
};

export default Awards;

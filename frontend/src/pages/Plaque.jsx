import React from "react";
import TableLayout from "../components/TableLayout";

const Plaque = () => {
  const sections = [
    {
      title: "INFORMATION TECH.",
      data: [],
    },
    {
      title: "MANAGEMENT",
      data: [],
    },
    {
      title: "MATHEMATICS",
      data: [],
    },
    {
      title: "NATURAL SCIENCES",
      data: [],
    },
    {
      title: "HUMANITIES",
      data: [],
    },
    {
      title: "SOCIAL SCIENCES",
      data: [],
    },
    {
      title: "NATIONAL SECURITY STUDIES",
      data: [],
    },
    {
      title: "ARMY PROFESSIONAL COURSES",
      data: [],
    },
    {
      title: "NAVY PROFESSIONAL",
      data: [],
    },
    {
      title: "AIR FORCE PROFESSIONAL",
      data: [],
    },
    {
      title: "DEPT. OF LEADERSHIP",
      data: [],
    },
    {
      title: "DEPT. OF TACTICAL OFFICERS",
      data: [],
    },
    {
      title: "SPORTS AND DEV. UNIT",
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

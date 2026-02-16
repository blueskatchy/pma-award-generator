import React from "react";
import TableSection from "./TableSection";

const TableLayout = ({ pageTitle, sections }) => {
  return (
    <div className="bg-surface p-7 md:p-16 w-full min-h-screen">
      
      {/* PAGE TITLE */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-700">
          {pageTitle}
        </h1>
      </div>

      {/* SECTIONS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section, index) => (
          <TableSection
            key={index}
            title={section.title}
            data={section.data}
          />
        ))}
      </div>

    </div>
  );
};

export default TableLayout;

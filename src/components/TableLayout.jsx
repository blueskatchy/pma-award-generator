import React from "react";
import TableSection from "./TableSection";
import { tablesWithButtons } from "../config/tableButtons";

const TableLayout = ({ pageTitle, sections, pageName }) => {

  const shouldShowButton = (sectionTitle) => {
    if (pageName === 'plaque' || pageName === 'streamer') {
      return true;
    }
    
    const pageButtons = tablesWithButtons[pageName];
    return pageButtons && pageButtons.includes(sectionTitle);
  };

  return (
    <div className="bg-surface p-7 md:p-16 w-full min-h-screen">
      
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-700">
          {pageTitle}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section, index) => (
          <TableSection
            key={index}
            title={section.title}
            data={section.data}
            showButton={shouldShowButton(section.title)}
          />
        ))}
      </div>

    </div>
  );
};

export default TableLayout;
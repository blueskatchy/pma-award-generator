import React, { useState } from "react";
import TableSection from "./TableSection";
import { tablesWithButtons } from "../config/tableButtons";
import exportOfficialPDF from "../config/exportOfficialPDF";

const TableLayout = ({ pageTitle, sections, pageName }) => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [showAllModal, setShowAllModal] = useState(null);

  const shouldShowButton = (sectionTitle) => {

    if (pageName === "plaque" || pageName === "streamer") {
      return true;
    }

    const pageButtons = tablesWithButtons[pageName];
    
    if (Array.isArray(pageButtons)) {
      return pageButtons.includes(sectionTitle);
    }
    
    return false;
  };

  const handleSeeMore = (title, data) => {
    if (shouldShowButton(title)) {
      setShowAllModal({
        title,
        data: data
      });
    }
  };

  const closeModals = () => {
    setSelectedSection(null);
    setShowAllModal(null);
  };

  const handleExportPDF = () => {
  exportOfficialPDF({
    pageTitle,
    sections,
    fileName: pageName,
  });
};

  return (
       <div className="bg-surface p-7 md:p-16 w-full min-h-screen page-transition">

      <div className="flex justify-between items-center mb-6">
  <h1 className="text-2xl md:text-3xl font-bold text-gray-700">
    {pageTitle}
  </h1>

<button
  onClick={handleExportPDF}
  className="text-gray-600 hover:text-gray-900 underline font-semibold transition"
>
  Export PDF
</button>
</div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section, index) => (
          <div key={index}>
            <TableSection
              title={section.title}
              data={section.data}
              showButton={shouldShowButton(section.title)}
              onSeeMore={handleSeeMore}
            />
          </div>
        ))}
      </div>

      {showAllModal && shouldShowButton(showAllModal.title) && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={closeModals}
          ></div>
          
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div className="bg-white rounded-lg p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto shadow-2xl">
              
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {showAllModal.title}
                </h2>
                <button
                  onClick={closeModals}
                  className="text-gray-500 hover:text-gray-700 text-3xl font-bold"
                >
                  ×
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr className="text-gray-500 text-base border-b">
                      <th className="text-center w-1/6 py-3">Rank</th>
                      <th className="text-center w-2/6 py-3">Name</th>
                      <th className="text-center w-1/6 py-3">Grade</th>
                    </tr>
                  </thead>

                  <tbody>
                    {showAllModal.data.length > 0 ? (
                      showAllModal.data.map((item, index) => (
                        <tr key={index} className="hover border-b">
                          <td className="text-center py-4 font-bold text-gray-700">
                            #{item.rank}
                          </td>
                          <td className="text-center py-4 font-medium">
                            {item.name}
                          </td>
                          <td className="text-center py-4">
                            <span className="px-3 py-1 rounded-full text-sm">
                              {item.grade}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="text-center py-8 text-gray-400">
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeModals}
                >
                </button>
              </div>

            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TableLayout;
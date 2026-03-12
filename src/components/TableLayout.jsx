// /src/components/TableLayout.jsx
import React, { useState } from "react";
import TableSection from "./TableSection";
import exportOfficialPDF from "../config/exportOfficialPDF";

const TableLayout = ({ pageTitle, sections, pageName, clickableNames = false }) => {
  const [showAllModal, setShowAllModal] = useState(null);

  const handleSeeMore = (title, fullData) => {
    setShowAllModal({ title, data: fullData });
  };

  const closeModals = () => setShowAllModal(null);

  const handleExportPDF = () => {
    const sectionsWithFullData = sections.map((section) => ({
      ...section,
      data: section.fullData || section.data,
    }));

    exportOfficialPDF({
      pageTitle,
      sections: sectionsWithFullData,
      fileName: pageName,
    });
  };

  return (
    <div className="bg-surface p-7 md:p-16 w-full min-h-screen page-transition">
      {/* Header */}
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

      {/* Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section, index) => (
          <div key={index}>
            <TableSection
              title={section.title}
              data={section.data}
              titleExtra={section.titleExtra}
              showButton={!!section.fullData && section.fullData.length > 1}
              onSeeMore={() => handleSeeMore(section.title, section.fullData)}
              clickableNames={clickableNames}
            />
          </div>
        ))}
      </div>

      {/* Full Modal */}
      {showAllModal && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={closeModals}
          ></div>

          {/* Modal */}
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
                          <td
                            className={`text-center py-4 font-medium ${
                              clickableNames
                                ? "text-blue-600 hover:text-blue-800 cursor-pointer hover:underline"
                                : "text-gray-800"
                            }`}
                          >
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
                        <td colSpan={3} className="text-center py-8 text-gray-400">
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TableLayout;
import React from "react";
import { useNavigate } from "react-router-dom";

const TableSection = ({ title, data = [], showButton = false }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold tracking-wide text-gray-800">
          {title}
        </h2>
        {showButton && (
          <button
            onClick={() => navigate(`/${title.toLowerCase().replace(/\s+/g, '-')}/all`)}
            className="px-3 py-1.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-xs font-medium"
          >
            See More
          </button>
        )}
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="text-gray-500 text-base">
              <th className="text-center w-1/4">Rank</th>
              <th className="text-center w-2/4">Name</th>
              <th className="text-center w-1/4">Grade</th>
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index} className="hover">
                  <td className="text-center py-4">{item.rank}</td>
                  <td className="text-center py-4 font-medium">
                    {item.name}
                  </td>
                  <td className="text-center py-4">{item.grade}</td>
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
  );
};

export default TableSection;
import React from "react";

const TableSection = ({ title, data }) => {
  return (
    <div className="card bg-base-100 shadow-md p-8 rounded-xl">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-lg md:text-xl font-semibold tracking-wide">
          {title}
        </h2>

        <button className="bg-black text-white text-xs px-5 py-2 rounded-lg hover:bg-gray-800 transition">
          See More
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="text-gray-500">
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
                <td colSpan="3" className="text-center py-8 text-gray-400">
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

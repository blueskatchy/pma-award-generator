import React from "react";

const TableSection = ({ title, data }) => {
  return (
    <div className="card bg-base-100 shadow-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">{title}</h2>

        <button className="bg-black text-white text-xs px-4 py-1 rounded-md hover:bg-gray-800 transition duration-200">
  See More
</button>

      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="text-gray-600">
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td>{item.rank}</td>
                  <td>{item.name}</td>
                  <td>{item.grade}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-400">
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

import React from "react";

const LatinTable = ({ title, data }) => {
  return (
    <div className="card bg-base-100 shadow-xl p-6">
      <h2 className="text-xl font-bold text-center mb-6">
        {title}
      </h2>

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
            {data.map((student, index) => (
              <tr key={index}>
                <td>{student.rank}</td>
                <td>{student.name}</td>
                <td>{student.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LatinTable;

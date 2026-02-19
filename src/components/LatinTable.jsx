import React from "react";

const LatinTable = ({ title, data }) => {
  return (
    <div className="card bg-base-100 shadow-xl p-8">
      <h2 className="text-2xl font-bold text-center mb-8 tracking-wide">
        {title}
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="text-gray-500 text-base">
              <th className="w-1/4 text-center">Rank</th>
              <th className="w-2/4 text-center">Name</th>
              <th className="w-1/4 text-center">Grade</th>
            </tr>
          </thead>

          <tbody>
            {data.map((student, index) => (
              <tr key={index} className="hover">
                <td className="text-center py-4">
                  {student.rank}
                </td>

                <td className="text-center py-4 font-medium">
                  {student.name}
                </td>

                <td className="text-center py-4">
                  {student.grade}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LatinTable;

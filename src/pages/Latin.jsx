import React from "react";

const Latin = () => {
  return (
    <div className="bg-surface p-7 md:p- mt-0 w-full overflow-y-auto custom-scrollbar">
            <div className="flex justify-between items-center mb-4 md:mb-6 text-gray-600">
                <h1 className="text-2xl md:text-3xl font-bold text-primary">
                    Latin  
                </h1>
            </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* CUM LAUDE */}
        <div className="card bg-base-100 shadow-xl p-4">
          <h2 className="text-xl font-bold text-center mb-4">
            CUM LAUDE
          </h2>

          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Juan Dela Cruz</td>
                  <td>90</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Maria Santos</td>
                  <td>89</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* MAGNA CUM LAUDE */}
        <div className="card bg-base-100 shadow-xl p-4">
          <h2 className="text-xl font-bold text-center mb-4">
            MAGNA CUM LAUDE
          </h2>

          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Jose Reyes</td>
                  <td>94</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Ana Garcia</td>
                  <td>93</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* SUMMA CUM LAUDE */}
        <div className="card bg-base-100 shadow-xl p-4">
          <h2 className="text-xl font-bold text-center mb-4">
            SUMMA CUM LAUDE
          </h2>

          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark Villanueva</td>
                  <td>98</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Claire Mendoza</td>
                  <td>97</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Latin;

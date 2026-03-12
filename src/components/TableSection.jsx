import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TableSection = ({
  title,
  data = [],
  showButton = false,
  onSeeMore,
  titleExtra,
  clickableNames = false
}) => {
  const navigate = useNavigate();
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleSeeMoreClick = (e) => {
    e.stopPropagation();
    if (onSeeMore) {
      onSeeMore(title, data);
    } else {
      navigate(`/${title.toLowerCase().replace(/\s+/g, "-")}/all`);
    }
  };

  const handleStudentClick = (student, e) => {
    e.stopPropagation();
    setSelectedStudent(student);
  };

  const closeModal = () => setSelectedStudent(null);

  const calculateGPA = (student) => {
    if (!student) return "0.00";
    if (student.courses && student.courses.length > 0) {
      const total = student.courses.reduce(
        (sum, course) => sum + parseFloat(course.grade),
        0
      );
      return (total / student.courses.length).toFixed(2);
    }
    const grade = parseFloat(student.grade);
    return isNaN(grade) ? "0.00" : (grade / 10).toFixed(2);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-4 min-h-[200px]">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <h2 className="text-xl font-bold tracking-wide text-gray-800">
              {title}
            </h2>
            {titleExtra && titleExtra}
          </div>
          {showButton && (
            <button
              onClick={handleSeeMoreClick}
              className="px-3 py-1.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-xs font-medium"
            >
              See More
            </button>
          )}
        </div>

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
                    <td
                      className={`text-center py-4 font-medium ${
                        clickableNames
                          ? "text-blue-600 hover:text-blue-800 cursor-pointer hover:underline"
                          : "text-gray-800"
                      }`}
                      onClick={
                        clickableNames ? (e) => handleStudentClick(item, e) : undefined
                      }
                    >
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

      {/* Student Courses Modal */}
      {clickableNames && selectedStudent && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={closeModal}
          ></div>

          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full pointer-events-auto shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">
                  STUDENT: {selectedStudent.name}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 text-3xl font-bold"
                >
                  ×
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr className="bg-gray-100 text-gray-700">
                      <th className="text-left py-3 px-4 font-semibold">Course</th>
                      <th className="text-center py-3 px-4 font-semibold w-24">Units</th>
                      <th className="text-center py-3 px-4 font-semibold w-24">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedStudent.courses && selectedStudent.courses.length > 0 ? (
                      selectedStudent.courses.map((course, idx) => (
                        <tr key={idx} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{course.name}</td>
                          <td className="text-center py-3 px-4">{course.units}</td>
                          <td className="text-center py-3 px-4 font-medium">{course.grade}</td>
                        </tr>
                      ))
                    ) : (
                      <>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">Information Systems</td>
                          <td className="text-center py-3 px-4">3</td>
                          <td className="text-center py-3 px-4 font-medium">9.9</td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">Mathematics</td>
                          <td className="text-center py-3 px-4">3</td>
                          <td className="text-center py-3 px-4 font-medium">9.8</td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">Leadership</td>
                          <td className="text-center py-3 px-4">2</td>
                          <td className="text-center py-3 px-4 font-medium">9.7</td>
                        </tr>
                      </>
                    )}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-50 font-semibold">
                      <td colSpan={2} className="text-right py-3 px-4">GPA:</td>
                      <td className="text-center py-3 px-4 text-blue-600">
                        {calculateGPA(selectedStudent)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TableSection;
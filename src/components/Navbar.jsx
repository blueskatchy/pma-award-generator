import { NavLink } from "react-router-dom";
import { useRef } from "react";
import logo from "../assets/logo_navbar.png"; 

export default function Navbar() {
  const fileInputRef = useRef(null);

  const linkClass = "px-4 py-2 text-sm font-medium transition duration-200";
  const activeClass = "text-yellow-400 border-b-2 border-yellow-400";
  const inactiveClass = "text-white hover:text-yellow-300";

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Latin", path: "/latin" },
    { name: "Saber", path: "/saber" },
    { name: "Awards", path: "/awards" },
    { name: "Plaque", path: "/plaque" },
    { name: "Streamer", path: "/streamer" },
  ];

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:3001/api/import-csv", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      alert(data.message || "Import successful!");
    } catch (error) {
      console.error(error);
      alert("Import failed!");
    }
  };

  return (
    <nav className="bg-gray-800 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="max-w-10xl mx-auto px-8 sm:px-8 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <NavLink to="/" className="flex-shrink-0">
            <img src={logo} alt="Logo" className="h-10 w-auto" />
          </NavLink>

          <div className="hidden md:flex space-x-4">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? activeClass : inactiveClass}`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-4">

            {/* Hidden File Input */}
            <input
              type="file"
              accept=".csv"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />

            <button
              onClick={handleImportClick}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200"
            >
              Import CSV
            </button>

            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200">
              Logout
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}

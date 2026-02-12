import { NavLink } from "react-router-dom";
import logo from "../assets/logo_navbar.png"; 

export default function Navbar() {
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

  return (
    <nav className="bg-gray-800 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Fixed "items-center" typo below */}
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Logo - Wrapped in NavLink so it's clickable! */}
          <NavLink to="/" className="flex-shrink-0">
            <img src={logo} alt="Logo" className="h-10 w-auto" />
          </NavLink>

          {/* Center: Menu */}
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

          {/* Right: Logout */}
          <div className="flex items-center">
            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
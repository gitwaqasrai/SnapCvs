import {
  FaUserAlt,
  FaTools,
  FaGraduationCap,
  FaBriefcase,
  FaFileAlt,
} from "react-icons/fa"; // Importing icons

/* eslint-disable react/prop-types */
const Navigation = ({ setActiveSection, activeSection }) => {
  return (
    <div className="flex gap-6 bg-white p-4 rounded-lg shadow-md justify-around">
      {/* Navigation Items with Icons */}
      <div
        className={`flex items-center cursor-pointer transition ${
          activeSection === "ContactInfo"
            ? "text-blue-500"
            : "hover:text-blue-500"
        }`}
        onClick={() => setActiveSection("ContactInfo")}
      >
        <FaUserAlt className="mr-2 text-lg" />
      </div>
      <div
        className={`flex items-center cursor-pointer transition ${
          activeSection === "Skills" ? "text-blue-500" : "hover:text-blue-500"
        }`}
        onClick={() => setActiveSection("Skills")}
      >
        <FaTools className="mr-2 text-lg" />
      </div>
      <div
        className={`flex items-center cursor-pointer transition ${
          activeSection === "Education"
            ? "text-blue-500"
            : "hover:text-blue-500"
        }`}
        onClick={() => setActiveSection("Education")}
      >
        <FaGraduationCap className="mr-2 text-lg" />
      </div>
      <div
        className={`flex items-center cursor-pointer transition ${
          activeSection === "Experience"
            ? "text-blue-500"
            : "hover:text-blue-500"
        }`}
        onClick={() => setActiveSection("Experience")}
      >
        <FaBriefcase className="mr-2 text-lg" />
      </div>
      <div
        className={`flex items-center cursor-pointer transition ${
          activeSection === "Summary" ? "text-blue-500" : "hover:text-blue-500"
        }`}
        onClick={() => setActiveSection("Summary")}
      >
        <FaFileAlt className="mr-2 text-lg" />
      </div>
    </div>
  );
};

export default Navigation;

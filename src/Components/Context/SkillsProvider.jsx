/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from "react";

// Create the context
const SkillsContext = createContext();

// Create a provider component
export const SkillsProvider = ({ children }) => {
  const [skillSections, setSkillSections] = useState([
    { id: 1, title: "Front End Developer", skills: ["JavaScript", "React.js"] },
  ]);

  // Function to add a new skill section
  const addSkillSection = () => {
    setSkillSections((prevSections) => [
      ...prevSections,
      {
        id:
          prevSections.length > 0
            ? Math.max(...prevSections.map((s) => s.id)) + 1
            : 1,
        title: "",
        skills: [],
      },
    ]);
  };

  // Function to update a skill section
  const updateSkillSection = (id, field, value) => {
    setSkillSections((prevSections) =>
      prevSections.map((section) =>
        section.id === id ? { ...section, [field]: value } : section
      )
    );
  };

  // Function to add a skill to a specific section
  const addSkill = (sectionId, newSkill) => {
    if (newSkill.trim()) {
      setSkillSections((prevSections) =>
        prevSections.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                skills: [...section.skills, newSkill.trim()],
              }
            : section
        )
      );
    }
  };

  // Function to remove a skill from a specific section
  const removeSkill = (sectionId, skillToRemove) => {
    setSkillSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              skills: section.skills.filter((skill) => skill !== skillToRemove),
            }
          : section
      )
    );
  };

  // Function to remove an entire skill section
  const removeSkillSection = (idToRemove) => {
    setSkillSections((prevSections) =>
      prevSections.filter((section) => section.id !== idToRemove)
    );
  };

  // Provide the state and functions to the children
  return (
    <SkillsContext.Provider
      value={{
        skillSections,
        addSkillSection,
        updateSkillSection,
        addSkill,
        removeSkill,
        removeSkillSection,
      }}
    >
      {children}
    </SkillsContext.Provider>
  );
};

// Custom hook to use the skills context
export const useSkills = () => {
  const context = useContext(SkillsContext);
  if (!context) {
    throw new Error("useSkills must be used within a SkillsProvider");
  }
  return context;
};

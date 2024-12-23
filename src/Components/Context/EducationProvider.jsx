/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const EducationContext = createContext({
  education: [],
  setEducation: () => {},
});

export const EducationProvider = ({ children }) => {
  const [education, setEducation] = useState([
    {
      school: "Stanford University",
      degree: "Bachelor of Computer Science",
      startDate: "",
      endDate: "",
      city: "San Francisco, CA",
      description:
        "Describe your academic achievements, relevant coursework, projects, or any other important details about your education.",
    },
  ]);

  return (
    <EducationContext.Provider value={{ education, setEducation }}>
      {children}
    </EducationContext.Provider>
  );
};

export const useEducation = () => {
  const context = useContext(EducationContext);
  return context;
};

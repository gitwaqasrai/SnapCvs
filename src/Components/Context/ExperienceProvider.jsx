/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

// Modify the context to support an array of experiences
const ExperienceContext = createContext({
  experiences: [],
  setExperiences: () => {},
});

export const ExperienceProvider = ({ children }) => {
  const [experiences, setExperiences] = useState([
    {
      "job-title": "Front End Developer",
      employer: "Google",
      startDate: "",
      endDate: "",
      city: "New York",
      description:
        "Collaborated with a world-class team to design and implement responsive, user-centric web applications. Specialized in creating dynamic interfaces using React, Next.js, and Tailwind CSS, optimizing performance and accessibility. Contributed to innovative projects, adhering to Google's high standards of coding and design excellence.",
    },
  ]);

  return (
    <ExperienceContext.Provider value={{ experiences, setExperiences }}>
      {children}
    </ExperienceContext.Provider>
  );
};

export const useExperience = () => {
  const context = useContext(ExperienceContext);
  return context;
};

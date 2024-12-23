/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const ProjectContext = createContext({
  project: [],
  setProject: () => {},
});

export const ProjectProvider = ({ children }) => {
  const [project, setProject] = useState([
    {
      "project-title": "Resume Builder App",
      description:
        "Developed a user-friendly Resume Builder application using React.js and Tailwind CSS, allowing users to create, customize, and download professional resumes. The app offers various templates, dynamic input fields, and real-time preview features to streamline the resume creation process. It demonstrates strong skills in front-end development, including state management, form handling, and responsive",
    },
  ]);

  return (
    <ProjectContext.Provider value={{ project, setProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  return context;
};

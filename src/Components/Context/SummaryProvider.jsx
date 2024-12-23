/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const SummaryContext = createContext({
  summary: "",
  setSummary: () => {},
});

export const SummaryProvider = ({ children }) => {
  const [summary, setSummary] = useState(
    "I'm a skilled Front-End Developer who brings designs to life. I build beautiful, user-friendly websites that are fast and easy to use. My passion for coding and creativity drives me to create amazing digital experiences."
  );

  return (
    <SummaryContext.Provider value={{ summary, setSummary }}>
      {children}
    </SummaryContext.Provider>
  );
};

export const useSummary = () => {
  const context = useContext(SummaryContext);
  return context;
};

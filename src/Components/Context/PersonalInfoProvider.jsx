/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const PersonalInfoContext = createContext({
  formData: [],
  setFormData: () => {},
});

export const PersonalInfoProvider = ({ children }) => {
  const [formData, setFormData] = useState(
    {
      firstName: "Waqas",
      lastName: "Rai",
      email: "waqas@gmail.com",
      phone: "+92 302 047 0251",
      country: "Pakistan",
      city: "Lahore",
      linkedin: "https://linkedin.com/waqas-rai",
      website: "https://waqasrai.com",
    },
  );

  return (
    <PersonalInfoContext.Provider value={{ formData, setFormData }}>
      {children}
    </PersonalInfoContext.Provider>
  );
};

export const usePersonalInfo = () => {
  const context = useContext(PersonalInfoContext);
  return context;
};

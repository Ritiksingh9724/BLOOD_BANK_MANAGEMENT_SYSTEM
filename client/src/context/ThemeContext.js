import React, {
  createContext,
  useEffect,
  useState,
} from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

  const [darkMode, setDarkMode] = useState(false);

  // Load saved theme
  useEffect(() => {

    const savedTheme = localStorage.getItem("darkMode");

    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    }

  }, []);

  // Apply theme
  useEffect(() => {

    localStorage.setItem(
      "darkMode",
      JSON.stringify(darkMode)
    );

    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }

  }, [darkMode]);

  return (
    <ThemeContext.Provider
      value={{ darkMode, setDarkMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
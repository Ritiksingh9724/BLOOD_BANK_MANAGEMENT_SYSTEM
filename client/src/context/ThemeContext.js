import React, {
  createContext,
  useEffect,
  useState,
} from "react";

export const ThemeContext =
  createContext();

export const ThemeProvider =
  ({ children }) => {

    const [darkMode, setDarkMode] =
      useState(false);

    // load theme

    useEffect(() => {

      const savedTheme =
        localStorage.getItem(
          "darkMode"
        );

      if (savedTheme) {

        setDarkMode(
          JSON.parse(savedTheme)
        );

      }

    }, []);

    // save theme

    useEffect(() => {

      localStorage.setItem(

        "darkMode",

        JSON.stringify(darkMode)
      );

      if (darkMode) {

        document.body.classList.add(
          "bg-dark",
          "text-white"
        );

      }

      else {

        document.body.classList.remove(
          "bg-dark",
          "text-white"
        );

      }

    }, [darkMode]);

    return (

      <ThemeContext.Provider

        value={{
          darkMode,
          setDarkMode,
        }}
      >

        {children}

      </ThemeContext.Provider>
    );
  };
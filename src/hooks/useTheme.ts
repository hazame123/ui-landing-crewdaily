"use client";

import { useEffect, useState } from "react";

export type Theme = "midnight_studio" | "golden_hour" | "arctic_blue" | "sage_professional" | "charcoal_pro" | "ocean_depths";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("midnight_studio");

  useEffect(() => {
    // Get saved theme from localStorage or default to midnight_studio
    const savedTheme = localStorage.getItem("theme") as Theme;
    const validThemes: Theme[] = ["midnight_studio", "golden_hour", "arctic_blue", "sage_professional", "charcoal_pro", "ocean_depths"];
    
    if (savedTheme && validThemes.includes(savedTheme)) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      document.documentElement.setAttribute("data-theme", "midnight_studio");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme: Theme = theme === "midnight_studio" ? "golden_hour" : "midnight_studio";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const setSpecificTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return {
    theme,
    toggleTheme,
    setTheme: setSpecificTheme,
    isDark: theme === "midnight_studio" || theme === "charcoal_pro" || theme === "ocean_depths",
    isLight: theme === "golden_hour" || theme === "arctic_blue" || theme === "sage_professional",
  };
}
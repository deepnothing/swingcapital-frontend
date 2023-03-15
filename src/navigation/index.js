import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import UserStack from "./userStack";
import AuthStack from "./authStack";
import LoadingScreen from "../screens/Loading";
import { Appearance } from "react-native";
import { ThemeContext } from "../hooks/ThemeContext";
import { storeData, getData } from "../hooks/asyncStorage";

export default function RootNavigation() {
  const { user } = useAuth();
  const [isThemeLoading, setThemeLoading] = useState(true);

  const [theme, setTheme] = useState({ mode: "light" });
  const updateTheme = (newTheme) => {
    let mode;
    if (!newTheme) {
      mode = theme.mode === "light" ? "dark" : "light";
      newTheme = { mode, system: false };
    } else {
      if (newTheme.system) {
        const systemColorScheme = Appearance.getColorScheme();
        mode = systemColorScheme === "light" ? "light" : "dark";
        newTheme = { ...newTheme, mode };
      } else {
        newTheme = { ...newTheme, system: false };
      }
    }
    setTheme(newTheme);
    storeData("theme", newTheme);
  };

  // monitor for system theme change
  if (theme.system) {
    Appearance.addChangeListener(({ colorScheme }) => {
      updateTheme({ system: true, mode: colorScheme });
    });
  }

  const fetchStoredTheme = async () => {
    try {
      const themeData = await getData("theme");
      if (themeData) {
        updateTheme(themeData);
      }
    } catch ({ message }) {
    } finally {
      setThemeLoading(false);
    }
  };

  useEffect(() => {
    fetchStoredTheme();
  }, []);

  if (user === null) {
    return <LoadingScreen />;
  }

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {user ? <UserStack /> : <AuthStack />}
    </ThemeContext.Provider>
  );
}

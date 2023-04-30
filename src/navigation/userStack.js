import React, { useState, useEffect, useContext } from "react";
import { useNetInfo } from "@react-native-community/netinfo";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ThemeContext } from "../hooks/ThemeContext";
import HomeScreen from "../screens/Home";
import NewsScreen from "../screens/News";
import BotScreen from "../screens/Bot";
import SettingsScreen from "../screens/Settings";
import NoInternet from "../screens/NoInternet";
import ServerDown from "../screens/ServerDown";
import Feather from "react-native-vector-icons/Feather";
import { colors } from "../styles/colors";
import { baseUrl } from "../config/api";

const Tab = createBottomTabNavigator();

export default function UserStack({ user, isGuestUser, setGuestUser }) {
  const [isTabBarShowing, setTabBarShowing] = useState(true);
  const [isApiRunning, setIsApiRunning] = useState(true);

  const { theme } = useContext(ThemeContext);
  const netInfo = useNetInfo();

  useEffect(() => {
    fetch(`${baseUrl}/health`)
      .then((response) => {
        if (!response.ok) {
          setIsApiRunning(false);
        }
      })
      .catch(() => {
        setIsApiRunning(false);
      });
  }, []);

  const tabs = [
    {
      name: "Home",
      iconName: "home",
      component: netInfo.isConnected
        ? isApiRunning
          ? HomeScreen
          : ServerDown
        : NoInternet,
      initialParams: {
        user: user,
        setTabBarShowing: setTabBarShowing,
        theme: theme,
        isGuestUser: isGuestUser,
      },
    },
    {
      name: "News",
      iconName: "file-text",
      component: netInfo.isConnected
        ? isApiRunning
          ? NewsScreen
          : ServerDown
        : NoInternet,
      initialParams: {
        theme: theme,
      },
    },
    {
      name: "Bot",
      iconName: "cpu",
      component: netInfo.isConnected ? BotScreen : NoInternet,
      initialParams: {
        user: user,
        theme: theme,
        isGuestUser: isGuestUser,
      },
    },
    {
      name: "Settings",
      iconName: "settings",
      component: SettingsScreen,
      initialParams: {
        theme: theme,
        isGuestUser: isGuestUser,
        setGuestUser: setGuestUser,
      },
    },
  ];

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor:
              theme.mode === "light" ? colors.swing : colors.dark.base,
            display: isTabBarShowing ? "flex" : "none",
            borderTopWidth: 3,
            borderTopColor:
              theme.mode === "light" ? colors.swing : colors.dark.base,
          },
        }}
      >
        {tabs.map((i, index) => (
          <Tab.Screen
            key={index}
            name={i.name}
            initialParams={i.initialParams}
            component={i.component}
            options={{
              tabBarActiveTintColor:
                theme.mode === "light" ? colors.light.base : colors.swing,
              tabBarInactiveTintColor:
                theme.mode === "light" ? colors.dark.base : colors.light.base,
              tabBarShowLabel: true,
              tabBarLabelStyle: { top: -3 },
              tabBarIcon: ({ focused }) => (
                <Feather
                  name={i.iconName}
                  color={
                    focused
                      ? theme.mode === "light"
                        ? colors.light.base
                        : colors.swing
                      : theme.mode === "light"
                      ? colors.dark.base
                      : colors.light.base
                  }
                  size={"24"}
                />
              ),
            }}
          />
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

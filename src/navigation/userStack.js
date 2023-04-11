import React, { useState, useEffect, useContext } from "react";
import { Dimensions, View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ThemeContext } from "../hooks/ThemeContext";
import HomeScreen from "../screens/Home";
import NewsScreen from "../screens/News";
import BotScreen from "../screens/Bot";
import SettingsScreen from "../screens/Settings";
import Feather from "react-native-vector-icons/Feather";

const Tab = createBottomTabNavigator();

export default function UserStack({ user, isGuestUser, setGuestUser }) {
  const [isTabBarShowing, setTabBarShowing] = useState(true);
  const { theme } = useContext(ThemeContext);

  const tabs = [
    {
      name: "Home",
      iconName: "home",
      component: HomeScreen,
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
      component: NewsScreen,
      initialParams: {
        theme: theme,
      },
    },
    {
      name: "Bot",
      iconName: "cpu",
      component: BotScreen,
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
            backgroundColor: theme.mode === "light" ? "#ffc72c" : "#000",
            display: isTabBarShowing ? "flex" : "none",
            borderTopWidth: 3,
            borderTopColor: theme.mode === "light" ? "#ffc72c" : "#000",
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
                theme.mode === "light" ? "#FFF" : "#ffc72c",
              tabBarInactiveTintColor: theme.mode === "light" ? "#000" : "#fff",
              tabBarShowLabel: true,
              tabBarLabelStyle: { top: -3 },
              tabBarIcon: ({ focused }) => (
                <Feather
                  name={i.iconName}
                  color={
                    focused
                      ? theme.mode === "light"
                        ? "white"
                        : "#ffc72c"
                      : theme.mode === "light"
                      ? "#000"
                      : "#FFF"
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

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

export default function UserStack({ user }) {
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
      },
    },
    {
      name: "Settings",
      iconName: "settings",
      component: SettingsScreen,
      initialParams: {
        theme: theme,
      },
    },
  ];

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#ffc72c",
            display: isTabBarShowing ? "flex" : "none",
            borderTopWidth: 3,
            borderTopColor: "#ffc72c",
            
          },
        }}
        sceneContainerStyle={{ backgroundColor: "#FFFFFF" }}
      >
        {tabs.map((i, index) => (
          <Tab.Screen
            key={index}
            name={i.name}
            initialParams={i.initialParams}
            component={i.component}
            options={{
              tabBarActiveTintColor: "#FFF",
              tabBarInactiveTintColor: "#000",
              tabBarShowLabel: true,
              tabBarLabelStyle: { top: -3 },
              tabBarIcon: ({ focused }) => (
                <Feather
                  name={i.iconName}
                  color={focused ? "white" : "#343434"}
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

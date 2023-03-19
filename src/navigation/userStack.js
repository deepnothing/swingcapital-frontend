import React, { useState, useEffect } from "react";
import { Modal, Text, View, Pressable, Appearance } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home";
import NewsScreen from "../screens/News";
import BotScreen from "../screens/Bot";
import SettingsScreen from "../screens/Settings";
import Feather from "react-native-vector-icons/Feather";

const Tab = createBottomTabNavigator();

export default function UserStack({ user }) {
  const [isTabBarShowing, setTabBarShowing] = useState(true);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#ffc72c",
            display: isTabBarShowing ? "" : "none",
          },
        }}
        sceneContainerStyle={{ backgroundColor: "#FFFFFF" }}
      >
        <Tab.Screen
          name="Home"
          initialParams={{ user: user, setTabBarShowing: setTabBarShowing }}
          component={HomeScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <Feather
                name="home"
                color={focused ? "white" : "#343434"}
                size={"24"}
              />
            ),
          }}
        />
        <Tab.Screen
          name="News"
          component={NewsScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <Feather
                name="file-text"
                color={focused ? "white" : "#343434"}
                size={"24"}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Bot"
          initialParams={{ user: user }}
          component={BotScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <Feather
                name="cpu"
                color={focused ? "white" : "#343434"}
                size={"24"}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <Feather
                name="settings"
                color={focused ? "white" : "#343434"}
                size={"24"}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

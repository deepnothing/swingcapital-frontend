import React, { useState } from "react";
import { Modal, Text, View, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home";
import NewsScreen from "../screens/News";
import BotScreen from "../screens/Bot";
import SettingsScreen from "../screens/Settings";
import Feather from "react-native-vector-icons/Feather";

const Tab = createBottomTabNavigator();

export default function UserStack() {
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
          component={HomeScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <Feather
                  name="home"
                  color={focused ? "white" : "#343434"}
                  size={"24"}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: `${focused ? "white" : "#343434"}`,
                  }}
                >
                  Home
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="News"
          component={NewsScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <Feather
                  name="file-text"
                  color={focused ? "white" : "#343434"}
                  size={"24"}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: `${focused ? "white" : "#343434"}`,
                  }}
                >
                  News
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Bot"
          component={BotScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <Feather
                  name="cpu"
                  color={focused ? "white" : "#343434"}
                  size={"24"}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: `${focused ? "white" : "#343434"}`,
                  }}
                >
                  Bots
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <Feather
                  name="settings"
                  color={focused ? "white" : "#343434"}
                  size={"24"}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: `${focused ? "white" : "#343434"}`,
                  }}
                >
                  Settings
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

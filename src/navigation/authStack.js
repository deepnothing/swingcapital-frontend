import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../screens/auth/Welcome";
import SignInScreen from "../screens/auth/SignIn";
import SignUpScreen from "../screens/auth/SignUp";

const Stack = createStackNavigator();

export default function AuthStack({ setGuestUser }) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          cardStyle: {
            backgroundColor: "#FFFF",
          },
          headerShown: false,
        }}
      >
        <Stack.Screen name="Welcome">
          {(props) => <WelcomeScreen {...props} setGuestUser={setGuestUser} />}
        </Stack.Screen>
        <Stack.Screen name="Sign In">
          {(props) => <SignInScreen {...props} setGuestUser={setGuestUser} />}
        </Stack.Screen>
        <Stack.Screen name="Sign Up">
          {(props) => <SignUpScreen {...props} setGuestUser={setGuestUser} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

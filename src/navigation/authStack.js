import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../screens/auth/Welcome';
import SignInScreen from '../screens/auth/SignIn';
import SignOutScreen from '../screens/auth/SignUp';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
          screenOptions={{
             cardStyle: {
            backgroundColor: '#FFFF'
          },
          headerShown: false
        }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Sign In" component={SignInScreen} />
        <Stack.Screen name="Sign Up" component={SignOutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './CoinList'
import StatsScreen from './Stats';
import CoinbasePro from '../CoinbasePro';
const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <NavigationContainer independent>
      <Stack.Navigator
          screenOptions={{
             cardStyle: {
            backgroundColor: '#FFFF'
          },
          headerShown: false
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Stats" component={CoinbasePro} />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import React from 'react';
import { Text, View,SafeAreaView} from 'react-native';
import SwingCapital from '../components/SwingCapital'


export default function HomeScreen() {

  return (
    <SafeAreaView className="w-full h-full">
      <View className="pl-4 pt-3 pb-3 border w-full flex justify-center align-center">
        <SwingCapital/>
      </View>
    </SafeAreaView>
  );
}


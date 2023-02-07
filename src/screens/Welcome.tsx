import React from 'react';
import { Text, Pressable,Image, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import {LinearGradient} from 'expo-linear-gradient';

function WelcomeScreen<StackScreenProps>({ navigation }) {
  return (
    <View className="w-full h-full">
  <View style={{flex:1, borderRadius: 20}}>
      <View className="mx-4 h-full flex justify-center align-center space-y-6">
      <View>
      <Image source={require('../../assets/logo-500.png')} style={{width: 70, height: 70, alignSelf: 'center'}}/>
      </View>
      <View >
        <Pressable className="bg-[#ffc72c]  rounded-3xl py-2 px-4 m-4" ><Text className="text-center text-black font-bold text-base" onPress={() => navigation.navigate('Sign In')}>Sign In</Text></Pressable>
        <Pressable className="bg-[#ffc72c] rounded-3xl py-2 px-4 m-4" ><Text className="text-center text-black font-bold text-base" onPress={() => navigation.navigate('Sign Up')}>Sign Up</Text></Pressable>
      </View>
    </View>
    </View>
    </View>
  );
}


export default WelcomeScreen;

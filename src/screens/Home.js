import React from "react";
import { Text, View, SafeAreaView, StyleSheet } from "react-native";
import SwingCapital from "../components/SwingCapital";

export default function HomeScreen() {
  return (
    <SafeAreaView className="w-full h-full">
      <View style={styles.topBar}>
        <SwingCapital />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topBar: {
    marginHorizontal: 12,
    marginTop:10,
    borderRadius:6,
    padding:15,
    paddingTop:19,
    backgroundColor:'#ffc72c',
    shadowColor: 'rgba(0, 0, 0, 0.45)',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius:5,
    
  },
});

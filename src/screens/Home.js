import React, { useEffect, useState } from "react";
import { Text, View, SafeAreaView, StyleSheet, FlatList } from "react-native";
import SwingCapital from "../components/SwingCapital";
import { baseUrl } from "../config/api";
import Coin from "../components/Coin";



export default function HomeScreen() {
  const [data,setData]=useState()
  useEffect(() => {
    fetch(`${baseUrl}/home`).then(res=>res.json()).then(response=>setData(response))
  }, []);
  

  return (
    <SafeAreaView className="w-full h-full">
      <View style={styles.topBar}>
        <SwingCapital text="Swing Capital" />
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => <Coin data={item} />}
        keyExtractor={(item) => item.name}
        style={styles.coinList}
        contentContainerStyle={{paddingBottom:40,paddingHorizontal:2}}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topBar: {
    marginHorizontal: 12,
    marginTop: 10,
    borderRadius: 6,
    padding: 15,
    paddingTop: 19,
    backgroundColor: "#ffc72c",
    shadowColor: "rgba(0, 0, 0, 0.45)",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation:10,
    zIndex:1
  },
  coinList: {
    marginHorizontal: 15,
    paddingTop: 35,
  },
});

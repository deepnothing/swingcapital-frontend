import React, { useEffect, useState } from "react";
import { Text, View, SafeAreaView, StyleSheet, FlatList } from "react-native";
import SwingCapital from "../components/SwingCapital";
import { baseUrl } from "../config/api";
import Coin from "../components/Coin";
import Feather from "react-native-vector-icons/Feather";

export default function HomeScreen() {
  const [data, setData] = useState();
  useEffect(() => {
    setIsRefreshing(true);
    fetch(`${baseUrl}/home`)
      .then((res) => res.json())
      .then((response) => {
        setData(response);
        setTimeout(() => {
          setIsRefreshing(false);
        }, 500);
      });
  }, []);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = () => {
    //set isRefreshing to true
    setIsRefreshing(true);
    fetch(`${baseUrl}/home`)
      .then((res) => res.json())
      .then((response) => {
        setData(response);
        setTimeout(() => {
          setIsRefreshing(false);
        }, 500);
      })
      .catch((error) => {
        console.error(error);
        setIsRefreshing(false);
      });
  };

  return (
    <SafeAreaView className="w-full h-full">
      <View style={styles.topBar}>
        <SwingCapital text="Swing Capital" />
        <Feather name="search" color={"#343434"} size={"25"} />
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => <Coin data={item} />}
        keyExtractor={(item) => item.name}
        style={styles.coinList}
        contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 2 }}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
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
    elevation: 10,
    zIndex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  coinList: {
    marginHorizontal: 15,
    paddingTop: 15,
  },
});

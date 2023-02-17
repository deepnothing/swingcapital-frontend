import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Pressable,
} from "react-native";
import SwingCapital from "../components/SwingCapital";
import { baseUrl } from "../config/api";
import Coin from "../components/Coin";
import Feather from "react-native-vector-icons/Feather";


export default function CoinList({navigation}){
    const [data, setData] = useState();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      fetch(`${baseUrl}/home`)
        .then((res) => res.json())
        .then((response) => {
          setData(response);
        });
    }, []);
  
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
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                navigation.navigate("Stats",{coinInfo:item});
              }}
            >
              <Coin data={item} />
            </Pressable>
          )}
          keyExtractor={(item) => item.name}
          contentContainerStyle={styles.listStyle}
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
    listStyle: {
      paddingBottom: 40,
      paddingHorizontal: 2,
      marginHorizontal: 15,
      paddingTop: 15,
    },
  });
  
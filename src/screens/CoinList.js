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
import Header from "../components/Header";


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
      <View>
        <Header>
          {/* <SwingCapital text="Swing Capital" /> */}
          {/* <Feather name="search" color={"#343434"} size={"25"} /> */}
        </Header>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                navigation.navigate("Stats",{coinName:item.name,coinColor:item.color});
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
      </View>
    );
  }
  
  const styles = StyleSheet.create({
  
    listStyle: {
      paddingBottom: '25%',
      paddingHorizontal: 2,
      marginHorizontal: 15,
      paddingTop: 15,
    },
  });
  
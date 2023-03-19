import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Pressable,
  TextInput,
} from "react-native";
import SwingCapital from "../components/SwingCapital";
import { baseUrl } from "../config/api";
import Coin from "../components/Coin";
import Feather from "react-native-vector-icons/Feather";
import Header from "../components/Header";
import { ref, onValue, update, set } from "firebase/database";
import { db } from "../config/firebase";
import { useAuth } from "../hooks/useAuth";

export default function CoinList({ navigation, route }) {
  const { user } = useAuth();
  const [data, setData] = useState();
  const [dataCopyForSearch, setDataCopyForSearch] = useState();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [favCoins, setFavCoins] = useState([]);

  useEffect(() => {
    refreshCoins();
  }, []);

  const refreshCoins = () => {
    setIsRefreshing(true);
    fetch(`${baseUrl}/home`)
      .then((res) => res.json())
      .then((response) => {
        //get favourite coins fron database and change order of homescreen accordingly
        const favCoins = ref(db, `users/${route.params.user.uid}`);
        onValue(favCoins, (snapshot) => {
          const data = snapshot.val();
          setFavCoins(data.favCoins);
          if (data.favCoins) {
            setData(arrangeItems(data.favCoins, response));
            setDataCopyForSearch(arrangeItems(data.favCoins, response));
          } else {
            setData(response);
            setDataCopyForSearch(response);
          }
          setTimeout(() => {
            setIsRefreshing(false);
          }, 500);
        });
      })
      .catch((error) => {
        console.error(error);
        setIsRefreshing(false);
      });
  };

  function arrangeItems(favorites, items) {
    const arrangedItems = [];

    favorites.forEach((favorite) => {
      const matchingItem = items.find((item) => item.name === favorite);
      if (matchingItem) {
        arrangedItems.push(matchingItem);
      }
    });

    items.forEach((item) => {
      if (!favorites.includes(item.name)) {
        arrangedItems.push(item);
      }
    });
    return arrangedItems;
  }

  const addOrRemoveFavCoin = (coinName) => {
    const newArrayOfCoins = favCoins
      ? favCoins.includes(coinName)
        ? favCoins.filter((item) => item !== coinName)
        : [...favCoins, coinName]
      : [coinName];

    update(ref(db, `users/${route.params.user.uid}`), {
      favCoins: newArrayOfCoins,
    });
  };
  const searchCoins = (items, input) => {
    if (input === "") {
      setData(items);
    } else {
      setData(items.filter((item) => item.name.includes(input.toLowerCase())));
    }
  };

  const onRefresh = () => {
    refreshCoins();
  };

  return (
    <View>
      <Header>
        {/* <SwingCapital text="Swing Capital" /> */}
        {/* <Feather name="search" color={"#343434"} size={"25"} /> */}
        <View style={styles.coinSearchWrapper}>
          <Feather name="search" color={"#000"} size={"20"} />
          <TextInput
            placeholder="Search.."
            onChangeText={(e) => searchCoins(dataCopyForSearch, e)}
            style={styles.coinSearch}
          />
        </View>
      </Header>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              navigation.navigate("Stats", {
                coinName: item.name,
                coinColor: item.color,
                setTabBarShowing: route.params.setTabBarShowing
              });
            }}
          >
            <Coin
              coinData={item}
              favCoins={favCoins}
              addOrRemoveFavCoin={addOrRemoveFavCoin}
            />
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
    paddingBottom: "25%",
    paddingHorizontal: 2,
    marginHorizontal: 15,
    paddingTop: 15,
  },
  coinSearchWrapper: {
    width: "100%",
    borderRadius: 5,
    backgroundColor: "#FFF",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  coinSearch: {
    width: "100%",
    marginLeft: 8,
  },
});

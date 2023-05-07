import React, { useEffect, useState, useContext } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Pressable,
  TextInput,
  RefreshControl,
  Alert,
} from "react-native";
import { ThemeContext } from "../hooks/ThemeContext";
import { baseUrl } from "../config/api";
import Coin from "../components/Coin";
import Feather from "react-native-vector-icons/Feather";
import Header from "../components/Header";
import { ref, onValue, update, set } from "firebase/database";
import { db } from "../config/firebase";
import { useAuth } from "../hooks/useAuth";
import ScreenContainer from "../components/ScreenContainer";

export default function CoinList({ navigation, route }) {
  const { user } = useAuth();
  const [data, setData] = useState();
  const [dataCopyForSearch, setDataCopyForSearch] = useState();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [favCoins, setFavCoins] = useState([]);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    console.log("focused: CoinList.js")
    refreshCoins();
  }, []);

  const refreshCoins = () => {
    setIsRefreshing(true);
    fetch(`${baseUrl}/coins`)
      .then((res) => res.json())
      .then((response) => {
        if (route.params.user) {
          //get favourite coins from database and change order of homescreen accordingly
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
        } else {
          setData(response);
          setDataCopyForSearch(response);
          setTimeout(() => {
            setIsRefreshing(false);
          }, 500);
        }
      })
      .catch((error) => {
        console.error(error);
        setIsRefreshing(false);
      });
  };

  // arrange the coin array based on user favourite if signed in
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
    if (route.params.user) {
      const newArrayOfCoins = favCoins
        ? favCoins.includes(coinName)
          ? favCoins.filter((item) => item !== coinName)
          : [...favCoins, coinName]
        : [coinName];

      update(ref(db, `users/${route.params.user.uid}`), {
        favCoins: newArrayOfCoins,
      });
    } else {
      Alert.alert("", "You must sign in to add favourites", [{ text: "OK" }]);
    }
  };
  const searchCoins = (items, input) => {
    if (input === "") {
      setData(items);
    } else {
      setData(
        items.filter(
          (item) =>
            item.name.toLowerCase().includes(input.toLowerCase()) ||
            (item.symbol &&
              item.symbol.toLowerCase().includes(input.toLowerCase()))
        )
      );
    }
  };

  const onRefresh = () => {
    refreshCoins();
  };

  return (
    <ScreenContainer>
      <Header justifyContent="center">
        <View
          style={[
            styles.coinSearchWrapper,
            { backgroundColor: theme.mode === "light" ? "#FFF" : "#161c29" },
          ]}
        >
          <Feather
            name="search"
            color={theme.mode === "light" ? "#000" : "#FFF"}
            style={{ fontSize: 20 }}
          />
          <TextInput
            placeholder="Search.."
            onChangeText={(e) => searchCoins(dataCopyForSearch, e)}
            placeholderTextColor={theme.mode === "light" ? "#000" : "#FFF"}
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
                coinLogo: item.logo,
                setTabBarShowing: route.params.setTabBarShowing,
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
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor={theme.mode === "light" ? "#000" : "#FFF"}
          />
        }
      />
    </ScreenContainer>
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
    borderRadius: 5,
    width: "90%",
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

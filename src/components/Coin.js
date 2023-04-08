import { useCallback, useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  LogBox,
} from "react-native";
import Card from "./Card";
import AllTimeChart from "./AllTimeChart";
import Feather from "react-native-vector-icons/Feather";
import IonIcon from "react-native-vector-icons/Ionicons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { ref, onValue, update, set } from "firebase/database";
import { db } from "../config/firebase";
import ThemeText from "./ThemeText";
import { ThemeContext } from "../hooks/ThemeContext";
LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);
export default function Coin({
  coinData,
  userId,
  favCoins,
  addOrRemoveFavCoin,
}) {
  const { theme } = useContext(ThemeContext);
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  function abbreviateNumber(value) {
    if (value >= 1e12) {
      return (value / 1e12).toFixed(2) + " T";
    } else if (value >= 1e9) {
      return (value / 1e9).toFixed(2) + " B";
    } else if (value >= 1e6) {
      return (value / 1e6).toFixed(2) + " M";
    } else if (value >= 1e3) {
      return (value / 1e3).toFixed(2) + " K";
    } else {
      return value.toFixed(2);
    }
  }

  return (
    <Card style={styles.flexColumn}>
      <View style={[styles.flexRow, { width: "100%" }]}>
        <View style={styles.flexRow}>
          <Image
            style={styles.logo}
            source={{
              uri: coinData.logo,
            }}
          />
          <View style={styles.flexColumn}>
            <View style={styles.flexRow}>
              <ThemeText>{coinData.symbol.toUpperCase()}</ThemeText>
              <ThemeText>${numberWithCommas(coinData.currentPrice)}</ThemeText>
            </View>
            <ThemeText>Cap:{abbreviateNumber(coinData.marketCap)}</ThemeText>
          </View>
        </View>

        <AllTimeChart data={coinData} />
        <View style={{ width: 8 }} />
        <TouchableOpacity onPress={() => addOrRemoveFavCoin(coinData.name)}>
          <IonIcon
            name={
              favCoins && favCoins.includes(coinData.name)
                ? "star"
                : "star-outline"
            }
            size="16"
            color={
              favCoins && favCoins.includes(coinData.name)
                ? "#ffc72c"
                : "#343434"
            }
          />
        </TouchableOpacity>
      </View>
      <View style={[styles.flexRow, { width: "100%" }]}>
        <Feather
          name="clock"
          size="18"
          color={theme.mode === "light" ? "#000" : "#FFF"}
        />
        <ThemeText>24 Hours</ThemeText>
        <ThemeText>{coinData.priceChange}</ThemeText>
        <ThemeText>High:27,000</ThemeText>
        <ThemeText>Low:27,000</ThemeText>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 30,
    width: 30,
    borderWidth: 1,
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column",
    borderWidth: 1,
  },
});

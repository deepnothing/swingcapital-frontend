import { useCallback, useEffect, useState } from "react";
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
LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);
export default function Coin({
  coinData,
  userId,
  favCoins,
  addOrRemoveFavCoin,
}) {
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
    <Card>
      <View style={styles.face}>
        <View style={styles.symbol}>
          <Image
            style={styles.logo}
            source={{
              uri: coinData.logo,
            }}
          />
          <View style={{ height: 5 }} />
          <Text style={styles.title}>{coinData.symbol.toUpperCase()}</Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "500",
              color: Math.sign(coinData.priceChange) === 1 ? "green" : "red",
            }}
          >
            $
            {coinData.currentPrice > 1
              ? numberWithCommas(coinData.currentPrice)
              : coinData.currentPrice}
          </Text>
        </View>
      </View>

      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            height: 65,
            marginRight: 20,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Feather name="clock" color={"#343434"} size={"19"} />
              <Text style={{ fontSize: 10 }}>24hr</Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "500",
                  color:
                    Math.sign(coinData.priceChange) === 1 ? "green" : "red",
                  marginLeft: 9,
                  width: 40,
                }}
              >
                {Math.sign(coinData.priceChange) === 1
                  ? "+" +
                    Math.round((coinData.priceChange + Number.EPSILON) * 100) /
                      100
                  : Math.round((coinData.priceChange + Number.EPSILON) * 100) /
                    100}
                %
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "500",
                  color:
                    Math.sign(coinData.priceChange) === 1 ? "green" : "red",
                  marginLeft: 9,
                  width: 40,
                }}
              >
                + $100
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "500",
                  color:
                    Math.sign(coinData.priceChange) === 1 ? "green" : "red",
                  marginLeft: 9,
                  width: 40,
                }}
              >
                high:27
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "500",
                  color: "red",
                  marginLeft: 9,
                  width: 40,
                }}
              >
                low:21
              </Text>
            </View>
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={{ fontWeight: "400", fontSize: 12 }}>
              ${abbreviateNumber(coinData.marketCap)}
            </Text>
            <Text style={{ fontWeight: "400", fontSize: 12, color: "green" }}>
              &nbsp;&nbsp;&nbsp;&nbsp;+0.01%
            </Text>
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
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "600",
    fontSize: 12,
  },
  name: { display: "flex", flexDirection: "column", alignItems: "center" },
  face: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    height: "100%",
  },
  logo: {
    height: 30,
    width: 30,
  },
});

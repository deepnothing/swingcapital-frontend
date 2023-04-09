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
      <View
        style={[
          styles.flexRow,
          {
            width: "100%",
            justifyContent: "space-between",
          },
        ]}
      >
        <View style={[styles.flexRow, { width: "50%", height: "100%" }]}>
          <Image
            style={styles.logo}
            source={{
              uri: coinData.logo,
            }}
          />
          <View style={[styles.flexColumn, { marginLeft: 10 }]}>
            <View style={styles.flexRow}>
              <ThemeText style={{ fontSize: 15, fontWeight: "700" }}>
                {coinData.symbol.toUpperCase()}
              </ThemeText>
              <View style={styles.dot} />
              <ThemeText
                style={{
                  fontWeight: "700",
                  color:
                    coinData.priceChange > 0
                      ? "#33c269"
                      : coinData.priceChange < 0
                      ? "#fd1c25"
                      : "black",
                }}
              >
                ${numberWithCommas(coinData.currentPrice)}
              </ThemeText>
            </View>
            <ThemeText
              style={[
                { fontSize: 12 },
                theme.mode === "light" ? { color: "#9da6ae" } : null,
              ]}
            >
              Cap: {abbreviateNumber(coinData.marketCap)}
            </ThemeText>
          </View>
        </View>
        <View
          style={[
            styles.flexRow,
            { width: "50%", justifyContent: "space-between" },
          ]}
        >
          <AllTimeChart data={coinData} />
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
                  : theme.mode === "light"
                  ? "#686d72"
                  : "#fff"
              }
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={[
          styles.flexRow,
          {
            width: "97%",
            justifyContent: "space-between",
          },
        ]}
      >
        <View style={styles.flexRow}>
          <Feather
            name="clock"
            size="18"
            color={theme.mode === "light" ? "#686d72" : "#FFF"}
          />
          <ThemeText
            style={[
              { fontSize: 13 },
              theme.mode === "light" ? { color: "#686d72" } : null,
            ]}
          >
            {" "}
            24 Hours
          </ThemeText>
        </View>

        <ThemeText
          style={{
            fontWeight: "600",
            color:
              coinData.priceChange > 0
                ? "#33c269"
                : coinData.priceChange < 0
                ? "#fd1c25"
                : "black",
          }}
        >
          {coinData.priceChange > 0 ? "+" : coinData.priceChange < 0 ? "-" : ""}
          {coinData.priceChange.toFixed(2)}%
        </ThemeText>
        <View
          style={{ backgroundColor: "#cbf1da", borderRadius: 6, padding: 4 }}
        >
          <Text style={{ color: "#33c269", fontSize: 11, fontWeight: "600" }}>
            High:$27,000
          </Text>
        </View>
        <View
          style={{ backgroundColor: "#ffdede", borderRadius: 6, padding: 4 }}
        >
          <Text style={{ color: "#fd1c25", fontSize: 11, fontWeight: "600" }}>
            Low:$27,000
          </Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 30,
    width: 30,
    borderRadius: 200,
    backgroundColor: "#efedf3",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // borderWidth: 1,
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column",
  },
  dot: {
    backgroundColor: "grey",
    borderRadius: 200,
    height: 3,
    width: 3,
    marginHorizontal: 3,
  },
});

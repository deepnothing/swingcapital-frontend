import { useContext } from "react";
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
import ThemeText from "./ThemeText";
import { ThemeContext } from "../hooks/ThemeContext";
import { colors } from "../styles/colors";
import { numberWithCommas } from "../utilities/utilities";
import { abbreviateNumber } from "../utilities/utilities";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);
export default function Coin({ coinData, favCoins, addOrRemoveFavCoin }) {
  const { theme } = useContext(ThemeContext);

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
                  fontSize: 14,
                  color:
                    coinData.priceChange > 0
                      ? "#33c269"
                      : coinData.priceChange < 0
                      ? "#fd1c25"
                      : "#686d72",
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
              Cap: {abbreviateNumber(coinData.marketCap, 2)}
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
              style={{ fontSize: 16 }}
              color={
                favCoins && favCoins.includes(coinData.name)
                  ? colors.swing
                  : theme.mode === "light"
                  ? "#686d72"
                  : colors.light.base
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
            style={{ fontSize: 18 }}
            color={theme.mode === "light" ? "#686d72" : colors.light.base}
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
            fontSize: 12,
            color:
              coinData.priceChange > 0
                ? "#33c269"
                : coinData.priceChange < 0
                ? "#fd1c25"
                : "#686d72",
          }}
        >
          {coinData.priceChange > 0 ? "+" : ""}
          {coinData.priceChange ? coinData.priceChange?.toFixed(2) : 0}%
        </ThemeText>
        <View
          style={[
            {
              backgroundColor: "#cbf1da",
            },
            styles.price24h,
          ]}
        >
          <Text
            numberOfLines={1}
            ellipsizeMode="clip"
            style={{ color: "#33c269", fontSize: 10, fontWeight: "600" }}
          >
            High:${coinData.high ? numberWithCommas(coinData.high) : "???"}
          </Text>
        </View>
        <View
          style={[
            {
              backgroundColor: "#ffdede",
            },
            styles.price24h,
          ]}
        >
          <Text
            numberOfLines={1}
            ellipsizeMode="clip"
            style={{ color: "#fd1c25", fontSize: 10, fontWeight: "600" }}
          >
            Low:${coinData.low ? numberWithCommas(coinData.low) : "???"}
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
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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
  price24h: {
    borderRadius: 3,
    padding: 4,
    width: 80,
  },
});

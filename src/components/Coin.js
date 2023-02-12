import { useCallback, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  RefreshControl,
} from "react-native";
import AllTimeChart from "./AlltTimeChart";
import Feather from "react-native-vector-icons/Feather";

export default function Coin({ data }) {
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <View style={styles.coin}>
      <View style={styles.face}>
        <View style={styles.name}>
          <Image
            style={styles.logo}
            source={{
              uri: data.logo,
            }}
          />
          <View style={{ height: 5 }} />
          <Text style={styles.title}>{data.name.toUpperCase()}</Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "500",
              color: Math.sign(data.priceChange) === 1 ? "green" : "red",
            }}
          >
            $
            {data.currentPrice > 1
              ? numberWithCommas(data.currentPrice)
              : data.currentPrice}
          </Text>
        </View>
      </View>

      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginRight: 20,
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
          <Text
            style={{
              fontSize: 13,
              fontWeight: "500",
              color: Math.sign(data.priceChange) === 1 ? "green" : "red",
              marginLeft: 9,
              width: 60,
            }}
          >
            {Math.sign(data.priceChange) === 1
              ? "+" +
                Math.round((data.priceChange + Number.EPSILON) * 100) / 100
              : Math.round((data.priceChange + Number.EPSILON) * 100) / 100}
            %
          </Text>
        </View>
        <AllTimeChart data={data} />
        <View style={{ width: 8 }} />
        <Feather name="star" color={"#343434"} size={"19"} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  coin: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 90,
    borderRadius: 10,
    padding: 7,
    marginVertical: 10,
    borderColor: "gray",
    shadowColor: "rgba(60, 64, 67, 0.3)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
    backgroundColor: "#FFFF",
  },
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

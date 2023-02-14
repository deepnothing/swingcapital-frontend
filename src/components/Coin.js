import { useCallback, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Card from "./Card";
import AllTimeChart from "./AllTimeChart";
import Feather from "react-native-vector-icons/Feather";
import IonIcon from "react-native-vector-icons/Ionicons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default function Coin({ data }) {
  const [isFavourited, setFavourited] = useState(false);

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
          <Text style={{ fontWeight: "400", fontSize: 12 }}>
            ${abbreviateNumber(data.marketCap)}
          </Text>
        </View>
        <AllTimeChart data={data} />
        <View style={{ width: 8 }} />
        <TouchableOpacity onPress={() => setFavourited(!isFavourited)}>
          <IonIcon
            name={isFavourited ? "star" : "star-outline"}
            size="16"
            color={isFavourited ? "#ffc72c" : "#343434"}
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

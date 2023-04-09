import { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import SocialChart from "./SocialChart/SocialChart";
import ThemeText from "./ThemeText";

export default function GoogleTrends(props) {
  const { data, routeColor } = props;
  const [interval, setInterval] = useState("weekly");
  const apx = (size = 0) => {
    let width = Dimensions.get("window").width;
    return (width / 750) * size;
  };

  const interValLabels = ["daily", "weekly"];

  return (
    <View style={styles.wrapper}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginVertical: 10,
          paddingHorizontal: 10,
          width: "100%",
        }}
      >
        <View>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>
            <Text style={{ color: "#4285F4" }}>G</Text>
            <Text style={{ color: "#DB4437" }}>o</Text>
            <Text style={{ color: "#F4B400" }}>o</Text>
            <Text style={{ color: "#4285F4" }}>g</Text>
            <Text style={{ color: "#0F9D58" }}>l</Text>
            <Text style={{ color: "#DB4437" }}>e</Text> Search Trends
          </Text>
        </View>
        <View style={styles.trendSelectContainer}>
          {/* cant loop these for some reason */}
          <View
            style={[
              styles.trendSelect,
              { backgroundColor: interval === "daily" ? "#FFC72c" : "#FFF" },
            ]}
          >
            <Text style={{ color: interval === "daily" ? "#FFF" : "#000" }}>
              Daily
            </Text>
          </View>
          <View
            style={[
              styles.trendSelect,
              { backgroundColor: interval === "weekly" ? "#FFC72c" : "#FFF" },
            ]}
          >
            <Text style={{ color: interval === "weekly" ? "#FFF" : "#000" }}>
              Weekly
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginVertical: 7,
        }}
      >
        {data.length > 0 ? (
          <SocialChart data={data} routeColor={routeColor} />
        ) : (
          <View style={{ height: apx(300) }}>
            <ActivityIndicator size="small" color={`rgb(${routeColor})`} />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    alignSelf: "center",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#FFF",
    borderRadius: 11,
  },
  trendSelectContainer: {
    display: "flex",
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 5,
    width: 150,
    height: 30,
    borderColor: "#ccc1cc",
    alignItems: "center",
    justifyContent: "space-around",
  },
  trendSelect: {
    fontSize: 14,
    fontWeight: "500",
    borderRadius: 5,
    borderRadius: 4,
    width: 70,
    height: "80%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

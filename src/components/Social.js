import { View, Text, Dimensions, ScrollView, StyleSheet } from "react-native";
import Map from "./Map/Map";
import GoogleTrends from "./GoogleTrends";
import Instagram from "./Instagram";
import YouTube from "./Youtube";

const dimensions = Dimensions.get("window");

export default function Social({ route }) {
  const data = require("./dummy.json");

  return (
    <View>
      <Map dimensions={dimensions} routeColor={route.params.coinColor} />
      <ScrollView style={style.socialData}>
        <GoogleTrends bars={data.default.timelineData} />
        <View style={{ display: "flex", flexDirection: "row" ,justifyContent:'space-evenly'}}>
          <Instagram />
          <YouTube />
        </View>
      </ScrollView>
    </View>
  );
}
const style = StyleSheet.create({
  socialData: {
    height: 100,
    borderWidth: 1,
    height: dimensions.height / 2.05,
    paddingHorizontal: 10,
  },
});

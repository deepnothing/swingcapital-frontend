import { View, Text, Dimensions, ScrollView, StyleSheet } from "react-native";
import Map from "./Map/Map";
import GoogleTrends from "./GoogleTrends";
import Instagram from "./Instagram";
import YouTube from "./Youtube";
import { useEffect } from "react";

const dimensions = Dimensions.get("window");

export default function Social({ route, googleData }) {
  const data = require("./dummy.json");
  useEffect(() => {
    console.log(googleData?.length);
  }, [googleData]);
  return (
    <View>
      {googleData ? (
        <Map dimensions={dimensions} routeColor={route.params.coinColor} />
      ) : null}
      <ScrollView style={style.socialData}>
        {googleData ? <GoogleTrends bars={data.default.timelineData} /> : null}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <Instagram />
          <YouTube />
        </View>
      </ScrollView>
    </View>
  );
}
const style = StyleSheet.create({
  socialData: {
    height: "100%",
    borderWidth: 1,
    height: dimensions.height / 2.05,
    paddingHorizontal: 10,
  },
});

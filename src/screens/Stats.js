import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Text,
} from "react-native";
// import { PanGestureHandler, State } from "react-native-gesture-handler";
// import Animated, {
//   add,
//   diffClamp,
//   eq,
//   modulo,
//   sub,
// } from "react-native-reanimated";
// import { onGestureEvent, useValues } from "react-native-redash";

import data from "../components/Stats/data.json";
import Chart, { size } from "../components/Stats/Chart";
import Values from "../components/Stats/Values";
import Line from "../components/Stats/Line";
import Label from "../components/Stats/Label";
import { Candle } from "../components/Stats/Candle";
import StatsHeader from "../components/StatsHeader";
import Financial from "../components/Financial";
// import Social from "../components/Social";
import GoogleTrends from "../components/GoogleTrends";
import Instagram from "../components/Instagram";
import YouTube from "../components/Youtube";
import Map from "../components/Map/Map";
import { baseUrl } from "../config/api";

const dimensions = Dimensions.get("window");

export default ({ route, navigation }) => {
  const [selectedMetric, setSelectedMetric] = useState("social");
  const [googleData, setGoogleData] = useState();
  const [isGoogleDataLoading, setGoogleDataLoading] = useState(true);
  const [instagramData, setinstagramData] = useState();
  const [youtubeData, setYoutubeData] = useState();
  const [redditData, setRedditData] = useState();

  useEffect(() => {
    route.params.setTabBarShowing(false);
    // Google
    setGoogleDataLoading(true);
    fetch(`${baseUrl}/social/google`)
      .then((res) => res.json())
      .then((response) => {
        const filteredData = response.filter(
          (item) => item.coin === route.params.coinName.toLowerCase()
        );
        setGoogleData(filteredData);
      })
      .catch(() => setGoogleData(null))
      .finally(() => setGoogleDataLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatsHeader
          navigation={navigation}
          setTabBarShowing={route.params.setTabBarShowing}
          route={route}
          selectedMetric={selectedMetric}
          setSelectedMetric={setSelectedMetric}
        />
        <View>
          {googleData !== undefined ? (
            <Map dimensions={dimensions} routeColor={route.params.coinColor} data={googleData[0].map} />
          ) : (
            <Text>Loading</Text>
          )}
          <ScrollView style={styles.socialData}>
            {googleData !== undefined ? (
              <GoogleTrends bars={googleData[0].search} />
            ) : (
              <Text>Loading</Text>
            )}
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
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  socialData: {
    height: "100%",
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});

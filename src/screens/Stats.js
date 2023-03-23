import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Text,
} from "react-native";
import { baseUrl } from "../config/api";
import StatsHeader from "../components/StatsHeader";
import GoogleTrends from "../components/GoogleTrends";
import Map from "../components/Map/Map";
import SocialCard from "../components/SocialCard";

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
            <Map
              dimensions={dimensions}
              routeColor={route.params.coinColor}
              data={googleData[0].map}
            />
          ) : (
            <Text>Loading</Text>
          )}
          <ScrollView style={styles.socialData}>
            {googleData !== undefined ? (
              <GoogleTrends bars={googleData[0].search} />
            ) : (
              <Text>Loading</Text>
            )}
            <View style={styles.column}>
              <View style={styles.socialRow}>
                <SocialCard
                  color="rgba(29, 161, 242)"
                  name="Twitter"
                  image={require("../../assets/twitter.png")}
                />
                <SocialCard
                  color="rgba(193, 53, 132)"
                  name="Instagram"
                  image={require("../../assets/instagram.png")}
                />
              </View>
              <View style={styles.socialRow}>
                <SocialCard
                  color="rgba(255, 86, 0)"
                  name="Reddit"
                  image={require("../../assets/reddit.png")}
                />
                <SocialCard
                  color="rgba(255, 0, 0)"
                  name="Youtube"
                  image={require("../../assets/youtube.png")}
                />
              </View>
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
    height: dimensions.height / 2,
    borderWidth: 3,
    paddingHorizontal: "4%",
    paddingBottom: 20,
  },
  socialRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  column: { display: "flex", flexDirection: "column" },
});

import React, { useEffect, useState, useContext } from "react";
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
import MapView, { Geojson } from "react-native-maps";
import { ThemeContext } from "../hooks/ThemeContext";
import ThemeText from "../components/ThemeText";
import Header from "../components/Header";
import ScreenContainer from "../components/ScreenContainer";
import TwitterFeed from "../components//Twitter/TwitterFeed";
import { colors } from "../styles/colors";

const dimensions = Dimensions.get("window");

export default ({ route, navigation }) => {
  const { theme } = useContext(ThemeContext);
  const [isScrollEnabled, setScrollEnabled] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState("social");
  const [googleData, setGoogleData] = useState();
  const [googleError, setGoogleError] = useState();
  const [twitterData, setTwitterData] = useState();
  const [twitterError, setTwittterError] = useState();
  const [instagramData, setinstagramData] = useState();
  const [youtubeData, setYoutubeData] = useState();
  const [redditData, setRedditData] = useState();

  const filteredData = (res) => {
    return res.find((obj) => obj.coin === route.params.coinName);
  };

  const formatTweetCount = (tweets) =>
    tweets.tweet_counts.data.map((i) => {
      // format data
      const unixTimestamp = Date.parse(i.end) / 1000;
      return {
        value: i.tweet_count,
        time: unixTimestamp,
      };
    });

  const formatGoogleValues = (data) =>
    data.map((i) => {
      return {
        value: i.value[0],
        time: i.time,
      };
    });

  useEffect(() => {
    // hide bottom tab bar
    route.params.setTabBarShowing(false);
    // Google
    fetch(`${baseUrl}/social/google`)
      .then((res) => res.json())
      .then((response) => {
        setGoogleData(filteredData(response));
      })
      .catch(() => {
        setGoogleError(true);
      });
    // Twitter
    fetch(`${baseUrl}/social/twitter`)
      .then((res) => res.json())
      .then((response) => {
        setTwitterData(filteredData(response));
      })
      .catch((error) => {
        setTwittterError(true);
      });
  }, []);

  const chartStyle = [
    styles.twitterChart,
    {
      backgroundColor:
        theme.mode === "light" ? "rgb(249,249,250)" : colors.dark.superhigh,
    },
  ];

  return (
    <ScreenContainer>
      <StatsHeader
        navigation={navigation}
        setTabBarShowing={route.params.setTabBarShowing}
        route={route}
        selectedMetric={selectedMetric}
        setSelectedMetric={setSelectedMetric}
      />
      <ScrollView
        style={styles.socialData}
        nestedScrollEnabled
        scrollEnabled={isScrollEnabled}
      >
        <Map
          routeColor={route.params.coinColor}
          data={googleData ? googleData.map : []}
          setScrollEnabled={setScrollEnabled}
          error={googleError}
        />
        <GoogleTrends
          routeColor={route.params.coinColor}
          data={googleData ? formatGoogleValues(googleData.search) : []}
          error={googleError}
        />
        <SocialCard
          color="29,161,242"
          name="Twitter"
          total={twitterData?.tweet_counts.meta.total_tweet_count}
          image={require("../../assets/twitter.png")}
          error={twitterError}
          chartStyle={chartStyle}
          data={twitterData ? formatTweetCount(twitterData) : null}
        >
          <TwitterFeed
            tweets={twitterData ? twitterData.tweets : null}
            error={twitterError}
          />
        </SocialCard>

        <SocialCard
          color="193, 53, 132"
          name="Instagram"
          image={require("../../assets/instagram.png")}
          chartStyle={styles.instagramChart}
        />
        <SocialCard
          color="255, 0, 0"
          name="Youtube"
          image={require("../../assets/youtube.png")}
          chartStyle={styles.youtubeChart}
        />

        {/* <SocialCard
          color="rgba(255, 86, 0)"
          name="Reddit"
          image={require("../../assets/reddit.png")}
          chartStyle={styles.twitterChart}
        /> */}

        <SafeAreaView />
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  socialData: {
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
  twitterChart: {
    borderRadius: 7,
    width: "100%",
    padding: 8,
  },
  instagramChart: {
    borderRadius: 8,
    width: "100%",
    padding: 8,
  },
  youtubeChart: {
    borderRadius: 8,
    width: "100%",
    padding: 8,
  },
});

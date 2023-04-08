import React, { useEffect, useState } from "react";
import {
  Text,
  Pressable,
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Modal,
  Image,
} from "react-native";
import SearchBar from "../components/SearchBar";
import Article from "../components/Article";
import IFrame from "../components/IFrame";
import SwingCapital from "../components/SwingCapital";
import { baseUrl } from "../config/api";
import { TouchableOpacity } from "react-native-gesture-handler";
import Header from "../components/Header";
import ScreenContainer from "../components/ScreenContainer";
import ThemeText from "../components/ThemeText";

function PercentBar(props) {
  return (
    <View
      style={[
        styles.percentBar,
        { backgroundColor: props.color, width: `${props.percent}%` },
      ]}
    >
      <ThemeText
        style={[styles.percentText, props.left ? { left: 0 } : { right: 0 }]}
      >
        {Math.round(props.percent)}%
      </ThemeText>
    </View>
  );
}

function News() {
  const [data, setData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [iFrameURL, setIframeUrl] = useState("");
  const [isIframeVisible, setIframeVisible] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  useEffect(() => {
    fetch(`${baseUrl}/news`)
      .then((res) => res.json())
      .then((response) => {
        setData(response);
      });
  }, []);

  const onRefresh = () => {
    //set isRefreshing to true
    setIsRefreshing(true);
    fetch(`${baseUrl}/news`)
      .then((res) => res.json())
      .then((response) => {
        setData(response);
        setTimeout(() => {
          setIsRefreshing(false);
        }, 500);
      })
      .catch((error) => {
        console.error(error);
        setIsRefreshing(false);
      });
  };

  // filter out articles with unkown sentiments
  const filteredSentiment = data.filter((obj) => obj.sentiment !== 0);

  // get the percent of positive and negative articles from filtered array
  const negativeSentiment = filteredSentiment.filter(
    (obj) => obj.sentiment < 0
  );
  const positiveSentiment = filteredSentiment.filter(
    (obj) => obj.sentiment > 0
  );

  const negativePercent =
    (negativeSentiment.length / filteredSentiment.length) * 100;
  const positivePercent =
    (positiveSentiment.length / filteredSentiment.length) * 100;

  return (
    <ScreenContainer>
      <Header justifyContent="center">
        {/* <SwingCapital text="News" /> */}
        <View style={styles.percentWrapper}>
          <PercentBar color="#E10600" percent={negativePercent} left />
          <PercentBar color="#008000" percent={positivePercent} />
        </View>
      </Header>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setIframeUrl(item.url);
              setIframeVisible(true);
            }}
          >
            <Article data={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index}
        contentContainerStyle={styles.listStyle}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
      />
      <Modal animationType="slide" transparent={true} visible={isIframeVisible}>
        {isIframeVisible ? (
          <IFrame
            visible={isIframeVisible}
            setIframeVisible={setIframeVisible}
            url={iFrameURL}
          />
        ) : null}
      </Modal>
    </ScreenContainer>
  );
}

export default News;
const styles = StyleSheet.create({
  percentWrapper: {
    width: "90%",
    position: "relative",
    height: 8,
    display: "flex",
    flexDirection: "row",
    top: "15%",
  },
  percentBar: {
    borderRadius: 10,
    height: "100%",
    position: "relative",
    marginHorizontal: 1,
  },
  percentText: {
    position: "absolute",
    bottom: 8,
    fontWeight: "600",
  },
  listStyle: {
    paddingBottom: "25%",
    paddingHorizontal: 2,
    marginHorizontal: 15,
    paddingTop: 15,
  },
});

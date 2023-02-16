import React, { useEffect, useState } from "react";
import {
  Text,
  Pressable,
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Modal,
} from "react-native";
import Article from "../components/Article";
import IFrame from "../components/IFrame";
import SwingCapital from "../components/SwingCapital";
import { baseUrl } from "../config/api";

function News() {
  const [data, setData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [iFrameURL, setIframeUrl] = useState("");
  const [isIframeVisible, setIframeVisible] = useState(false);

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
    <SafeAreaView className="w-full h-full">
      <View style={styles.topBar}>
        <SwingCapital text="News" />

        <View
          style={{
            width: 200,
            position: "relative",
            height: 10,
            display: "flex",
            flexDirection: "row",
            top:'50%'
          }}
        >
          <View
            style={{
              borderRadius: 10,
              height: "100%",
              backgroundColor: "#E10600",
              width: `${negativePercent}%`,
              position: "relative",
              marginHorizontal:1
            }}
          >
            <Text
              style={{
                position: "absolute",
                left: 0,
                bottom: 10,
                fontWeight: "600",
              }}
            >
              {Math.round(negativePercent)}%
            </Text>
          </View>
          <View
            style={{
              borderRadius: 10,
              height: "100%",
              backgroundColor: "#008000",
              width: `${positivePercent}%`,
              marginHorizontal:1

            }}
          >
            <Text
              style={{
                position: "absolute",
                right: 0,
                bottom: 10,
                fontWeight: "600",
              }}
            >
              {Math.round(positivePercent)}%
            </Text>
          </View>
        </View>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Article
            data={item}
            onPress={() => {
              setIframeUrl(item.url);
              setIframeVisible(true);
            }}
          />
        )}
        keyExtractor={(item, index) => index}
        contentContainerStyle={{
          paddingBottom: 40,
          paddingHorizontal: 2,
          marginHorizontal: 15,
          paddingTop: 15,
        }}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
      />
      <Modal animationType="slide" transparent={true} visible={isIframeVisible}>
        <IFrame
          visible={isIframeVisible}
          setIframeVisible={setIframeVisible}
          url={iFrameURL}
        />
      </Modal>
    </SafeAreaView>
  );
}

export default News;
const styles = StyleSheet.create({
  topBar: {
    marginHorizontal: 12,
    marginTop: 10,
    borderRadius: 6,
    padding: 15,
    paddingTop: 19,
    backgroundColor: "#ffc72c",
    shadowColor: "rgba(0, 0, 0, 0.45)",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 10,
    zIndex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

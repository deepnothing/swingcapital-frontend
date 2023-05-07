import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Modal,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import Article from "../components/Article";
import IFrame from "../components/IFrame";
import { baseUrl } from "../config/api";
import Header from "../components/Header";
import ScreenContainer from "../components/ScreenContainer";
import ThemeText from "../components/ThemeText";
import { ThemeContext } from "../hooks/ThemeContext";
import PercentBar from "../components/PercentBar";

function News() {
  const { theme } = useContext(ThemeContext);

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
    <ScreenContainer>
      <Header justifyContent="center">
        <PercentBar
          negativePercent={negativePercent}
          positivePercent={positivePercent}
          width="90%"
        />
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
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor={theme.mode === "light" ? "#000" : "#FFF"} // set the activity indicator color to blue
          />
        }
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
  listStyle: {
    paddingBottom: "25%",
    paddingHorizontal: 2,
    marginHorizontal: 15,
    paddingTop: 15,
  },
});

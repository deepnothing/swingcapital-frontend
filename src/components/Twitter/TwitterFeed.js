import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
  Text,
  Linking,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import ThemeText from "../ThemeText";
import { useContext } from "react";
import { ThemeContext } from "../../hooks/ThemeContext";
import { colors } from "../../styles/colors";
import { errorMessage } from "../../config/text";
import Tweet from "./Tweet";



export default function TwitterFeed({ tweets, error }) {
  const { theme } = useContext(ThemeContext);
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            theme.mode === "light" ? "rgb(249,249,250)" : colors.dark.superhigh,
        },
      ]}
    >
      {tweets ? (
        <ScrollView>
          {tweets.data.map((i, index) => {
            return (
              <Tweet
                key={index}
                item={i}
                authorInfo={tweets.includes.users[index]}
              />
            );
          })}
        </ScrollView>
      ) : error ? (
        <ThemeText>{errorMessage}</ThemeText>
      ) : (
        <ActivityIndicator color="#1DA1F2" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 170,
    marginTop: 10,
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    alignItems:'center'
  },
  tweet: {
    width: "100%",
    padding: 15,
    display: "flex",
    flexDirection: "column",
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  pic: {
    height: 50,
    width: 50,
    borderRadius: 200,
  },
  name: {
    fontSize: 15,
    fontWeight: "700",
  },
  username: {
    fontSize: 12,
  },
});

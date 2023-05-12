import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Platform,
} from "react-native";
import ThemeText from "../ThemeText";
import { useContext } from "react";
import { ThemeContext } from "../../hooks/ThemeContext";
import { colors } from "../../styles/colors";
import { errorMessage } from "../../config/text";
import YoutubeVideo from "./YoutubeVideo";

export default function YoutubeFeed({ data, error, coinName }) {
  const { theme } = useContext(ThemeContext);

  const filteredData = data?.filter((item) =>
    item.title.toLowerCase().includes(coinName?.toLowerCase())
  );
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
      {filteredData ? (
        <ScrollView nestedScrollEnabled>
          {filteredData.map((i, index) => {
            return <YoutubeVideo key={index} item={i} />;
          })}
        </ScrollView>
      ) : error ? (
        <ThemeText>{errorMessage}</ThemeText>
      ) : (
        <ActivityIndicator color="#FF0000" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: Platform.isPad ? 380 : 170,
    marginTop: 10,
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

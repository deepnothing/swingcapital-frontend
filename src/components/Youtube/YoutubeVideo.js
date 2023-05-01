import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Linking,
  TouchableOpacity,
} from "react-native";
import { WebView } from "react-native-webview";

import ThemeText from "../ThemeText";
import Feather from "react-native-vector-icons/Feather";
import { useContext } from "react";
import { ThemeContext } from "../../hooks/ThemeContext";
import { formatDateString, numberWithCommas } from "../../utilities/utilities";

export default function YoutubeVideo({ item }) {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={styles.container}>
      <View style={[styles.column, { justifyContent: "space-evenly" }]}>
        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.video,
              { borderColor: theme.mode === "light" ? "#777a7d" : "#FFF" },
            ]}
            onPress={() => Linking.openURL(item.url)}
          >
            <Feather
              name="play-circle"
              style={{ fontSize: 25 }}
              color={"#FF0000"}
            />
          </TouchableOpacity>

          <View style={styles.spacer} />
          <ThemeText
            numberOfLines={2}
            ellipsizeMode="tail"
            style={styles.videoTitle}
          >
            {item.title}
          </ThemeText>
        </View>
        <View style={styles.spacer} />

        <View style={[styles.row, { width: "100%" }]}>
          <View style={styles.row}>
            <Feather
              name="calendar"
              style={{ fontSize: 18 }}
              color={theme.mode === "light" ? "#000" : "#FFF"}
            />
            <ThemeText style={{ color: "#777a7d" }}>
              {" "}
              {formatDateString(item.data_date)}
            </ThemeText>
          </View>
          <View style={styles.spacer} />
          <View style={styles.row}>
            <Feather
              name="eye"
              style={{ fontSize: 18 }}
              color={theme.mode === "light" ? "#000" : "#FFF"}
            />
            <ThemeText style={{ color: "#777a7d" }}>
              {" "}
              {item.views ? numberWithCommas(item.views) : "?"}
            </ThemeText>
          </View>
        </View>
        <View style={styles.row}>
          <ThemeText style={{ fontSize: 15 }}>@ {item.channel_name}</ThemeText>
          <View style={styles.spacer} />
          <ThemeText style={{ fontSize: 12, color: "#777a7d" }}>
            {numberWithCommas(item.subscribers)} subscribers
          </ThemeText>
          <View style={styles.spacer} />
          <Feather
            name="external-link"
            style={{ fontSize: 18 }}
            color={"#FF0000"}
            onPress={() => Linking.openURL(item.channel_link)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: Dimensions.get("window").width / 1.2,
    padding: 5,
    marginVertical: 8,
  },
  videoTitle: {
    fontWeight: "600",
    width: "80%",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    height: 120,
  },
  spacer: { width: 10 },
  video: {
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
});

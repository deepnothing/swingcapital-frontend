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
import ThemeText from "./ThemeText";
import { useContext } from "react";
import { ThemeContext } from "../hooks/ThemeContext";
import { colors } from "../styles/colors";

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
}

const Tweet = ({ item, authorInfo }) => {
  return (
    <View style={styles.tweet}>
      <View
        style={[
          styles.row,
          {
            alignItems: "center",
            justifyContent: "space-between",
          },
        ]}
      >
        <View style={styles.row}>
          <Image
            style={styles.pic}
            source={{ uri: authorInfo.profile_image_url }}
          />
          <View style={[styles.column, { marginLeft: 10 }]}>
            <ThemeText style={styles.name}>{authorInfo.name}</ThemeText>
            <ThemeText style={styles.username}>
              @{authorInfo.username}
            </ThemeText>
          </View>
        </View>
        <View style={[styles.column, { alignItems: "flex-end" }]}>
          <Feather
            name="external-link"
            color={"#1DA1F2"}
            size={"18"}
            onPress={() =>
              Linking.openURL(
                `https://twitter.com/swingcapitalapp/status/${item.id}`
              )
            }
          />
          <ThemeText style={{ fontSize: 10, marginTop: 5 }}>
            {formatDate(item.created_at)}
          </ThemeText>
        </View>
      </View>
      <View style={{ height: 10 }} />
      <ThemeText numberOfLines={3} style={{ fontSize: 12 }}>
        {item.text}
      </ThemeText>
    </View>
  );
};
export default function TwitterFeed({ tweets }) {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      {tweets ? (
        <View
          style={[
            styles.container,
            {
              backgroundColor:
                theme.mode === "light" ? "rgb(249,249,250)" : colors.dark.superhigh,
            },
          ]}
        >
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
        </View>
      ) : (
        <ActivityIndicator />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 170,
    marginTop: 10,
    borderRadius: 8,
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

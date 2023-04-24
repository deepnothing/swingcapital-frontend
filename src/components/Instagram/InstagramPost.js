import {
  View,
  Text,
  Image,
  Linking,
  StyleSheet,
  Dimensions,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import ThemeText from "../ThemeText";
import { formatDate } from "../../utilities/utilities";
import { useContext } from "react";
import { ThemeContext } from "../../hooks/ThemeContext";
export default function InstagramPost({ item }) {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={styles.container}>
      <View style={theme.mode === "light"
            ? {
                shadowColor: "rgba(0, 0, 0, 0.45)",
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 1,
                shadowRadius: 5,
                elevation: 10,
              }
            : null}>
        <Image style={[styles.image]} source={{ uri: item.displayUrl }} />
      </View>

      <View style={styles.column}>
        <ThemeText style={styles.text} ellipsizeMode="tail" numberOfLines={2}>
          {item.caption}
        </ThemeText>
        <View style={styles.row}>
          <Feather
            name="heart"
            color={theme.mode === "light" ? "#000" : "#FFF"}
            size={"25"}
          />
          <ThemeText style={styles.text}> {item.likesCount}</ThemeText>
        </View>
        <View style={styles.row}>
          <Feather
            name="message-circle"
            color={theme.mode === "light" ? "#000" : "#FFF"}
            size={"25"}
          />
          <ThemeText style={styles.text}> {item.commentsCount}</ThemeText>
        </View>

        <View style={styles.row}>
          <ThemeText style={styles.text}>
            {formatDate(item.timestamp)}
          </ThemeText>
          <Feather
            name="external-link"
            color={"#C13584"}
            size={"18"}
            style={{ marginLeft: 10 }}
            onPress={() => Linking.openURL(item.url)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 15,
    maxWidth: Dimensions.get("window").width / 1.2,
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 8,
    margin:5
  },
  column: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    margin: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 12,
  },
});

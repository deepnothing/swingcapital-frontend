import { View, Image, Linking, StyleSheet, Dimensions } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import ThemeText from "../ThemeText";
import { formatDate } from "../../utilities/utilities";

export default function Tweet({ item, authorInfo }) {
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
            source={{ uri: authorInfo?.profile_image_url }}
          />
          <View style={[styles.column, { marginLeft: 10 }]}>
            <ThemeText style={styles.name}>{authorInfo?.name}</ThemeText>
            <ThemeText style={styles.username}>
              @{authorInfo?.username}
            </ThemeText>
          </View>
        </View>
        <View style={[styles.column, { alignItems: "flex-end" }]}>
          <Feather
            name="external-link"
            color={"#1DA1F2"}
            style={{ fontSize: 18 }}
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
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 170,
    marginTop: 10,
    borderRadius: 8,
    borderWidth: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // maxWidth: Dimensions.get("window").width / 1.2
  },
  tweet: {
    width: "100%",
    padding: 15,
    display: "flex",
    flexDirection: "column",
    maxWidth: Dimensions.get("window").width / 1.16,
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

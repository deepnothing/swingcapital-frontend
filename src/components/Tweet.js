import { View, Image, Linking } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import ThemeText from "./ThemeText";

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
}

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
}

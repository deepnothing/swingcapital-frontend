import { View, Text, Image, StyleSheet } from "react-native";
import SocialGraph from "./SocialGraph";
export default function SocialCard({ color, name, image }) {
  return (
    <View style={styles.container}>
      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Image style={{ width: 30, height: 30 }} source={image} />
        <Text style={{ fontWeight: "500", fontSize: 15, marginLeft: 5 }}>
          {name}
        </Text>
      </View>
      <Text style={{ marginTop: 3, fontSize: 12 }}>
        Total:<Text style={{ fontWeight: "700", fontSize: 15 }}>19M</Text>
      </Text>
      <SocialGraph color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    width: "48%",
    aspectRatio: 1,
    borderRadius: 12,
    // marginHorizontal: 15,
    padding: 10,
    display: "flex",
    flexDirection: "column",
  },
});

import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import SocialGraph from "./SocialGraph";
export default function TwitterCard({ color, name, image }) {
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
      <View style={{ display: "flex", flexDirection: "row" }}>
        <View style={{ borderWidth: 1, width: "50%", height: 120 }}>
          <Text>GRAPH</Text>
        </View>
        <ScrollView style={{ borderWidth: 1, width: "50%", height: 120 }}>
          <Text>SCROLLABLE TWEET LIST</Text>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    width: "100%",
    borderRadius: 12,
    // marginHorizontal: 15,
    padding: 10,
    display: "flex",
    flexDirection: "column",
    height: 200,
  },
});

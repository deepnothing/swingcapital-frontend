import { View, Text, StyleSheet, Image } from "react-native";
import Feather from "react-native-vector-icons/Feather";

export default function Instagram() {
  return (
    <View style={styles.container}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Image
          style={{ width: 30, height: 30 }}
          source={require("../../assets/instagram.png")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    width: "45%",
    aspectRatio: 1,
    borderRadius: 20,
    marginHorizontal: 15,
    padding: 10,
  },
});

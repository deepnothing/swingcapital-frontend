import { View, Text, StyleSheet } from "react-native";
import Feather from "react-native-vector-icons/Feather";

export default function YouTube() {
  return (
    <View style={styles.container}>
      <Feather name="youtube" color={"#000"} size={"30"} />
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
    padding:10
  },
});

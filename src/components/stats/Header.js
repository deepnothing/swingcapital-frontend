import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Feather from "react-native-vector-icons/Feather";
export default function Header({ navigation, route }) {
  const { coinInfo } = route.params;

  return (
    <View style={style.heading}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Feather name="arrow-left" color={"#000"} size={"25"} />
      </TouchableOpacity>
      <Text>{coinInfo.name}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  heading: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

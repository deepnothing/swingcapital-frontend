import { View, Text, Dimensions } from "react-native";
import Map from "./Map/Map";

const dimensions = Dimensions.get("window");

export default function Social() {
  return (
    <View>
      <Text>kkk</Text>
      <Map dimensions={dimensions} />
    </View>
  );
}

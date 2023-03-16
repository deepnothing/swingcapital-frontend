import { View, Text, Dimensions } from "react-native";
import Map from "./Map/Map";

const dimensions = Dimensions.get("window");

export default function Social({ route }) {
  return (
    <View>
      <Map dimensions={dimensions} routeColor={[251, 206, 177]} />
    </View>
  );
}

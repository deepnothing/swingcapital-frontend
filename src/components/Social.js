import { View, Text, Dimensions } from "react-native";
import Map from "./Map/Map";

const dimensions = Dimensions.get("window");

export default function Social({route}) {
  return (
    <View>
      <Text>kkk</Text>
      <Map dimensions={dimensions} routeColor={route.params.coinColor} />
    </View>
  );
}

import { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  Image,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Feather from "react-native-vector-icons/Feather";
import ThemeText from "./ThemeText";
import { ThemeContext } from "../hooks/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./Header";

const windowWidth = Dimensions.get("window").width;

export default function StatsHeader({
  navigation,
  route,
  selectedMetric,
  setSelectedMetric,
  setTabBarShowing,
}) {
  const { theme } = useContext(ThemeContext);
  return (
    <Header
      style={{
        backgroundColor: theme.mode === "light" ? "#fff" : "#000",
        shadowOpacity: 0,
      }}
      justifyContent="space-around"
    >
      <TouchableOpacity
        onPress={() => {
          setTabBarShowing(true);
          navigation.navigate("Home");
        }}
        style={style.goBack}
      >
        <Feather
          name="arrow-left"
          color={theme.mode === "dark" ? "#FFF" : "#000"}
          size={"20"}
        />
        <Text style={{ fontSize: 15, fontWeight: "600", color: "#FFC72C" }}>
          &nbsp;Back
        </Text>
      </TouchableOpacity>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <ThemeText style={{ fontSize: 16, fontWeight: "600" }}>
          {route.params.coinName}{" "}
        </ThemeText>
        <Image
          source={{ uri: route.params.coinLogo }}
          style={{ height: 20, width: 20, position: "absolute", right: -20 }}
        />
      </View>

      <View style={style.titleContainer} />
    </Header>
  );
}

const style = StyleSheet.create({
  heading: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    width: "100%",
    borderWidth: 1,
    height: 110,
  },
  relative: {
    position: "relative",
    borderWidth: 1,
  },
  goBack: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: windowWidth / 3,
  },
  titleContainer: {
    width: windowWidth / 3,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  titleInfo: {
    width: "85%",
  },
});

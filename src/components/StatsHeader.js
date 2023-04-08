import { useContext } from "react";
import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Feather from "react-native-vector-icons/Feather";
import ThemeText from "./ThemeText";
import { ThemeContext } from "../hooks/ThemeContext";

const windowWidth = Dimensions.get("window").width;

export default function StatsHeader({
  navigation,
  route,
  selectedMetric,
  setSelectedMetric,
  setTabBarShowing,
}) {
  // const { coinName, coinColor } = route.params;
  const { theme } = useContext(ThemeContext);
  return (
    <View style={style.heading}>
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
          size={"25"}
        />
        <Text style={{ fontSize: 15, fontWeight: "600", color: "#FFC72C" }}>
          &nbsp;Back
        </Text>
      </TouchableOpacity>
      <ThemeText style={{ fontSize: 15 }}>{route.params.coinName}</ThemeText>
      <View style={style.titleContainer} />
    </View>
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

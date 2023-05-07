import { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import ThemeText from "./ThemeText";
import { ThemeContext } from "../hooks/ThemeContext";
import Header from "./Header";
import { colors } from "../styles/colors";

const windowWidth = Dimensions.get("window").width;

export default function StatsHeader({ navigation, route, setTabBarShowing }) {
  const { theme } = useContext(ThemeContext);
  return (
    <Header
      style={{
        backgroundColor:
          theme.mode === "light" ? colors.light.base : colors.dark.base,
        shadowOpacity: 0,
      }}
      justifyContent="space-around"
    >
      <StatusBar
        backgroundColor={
          theme.mode == "light" ? colors.light.base : colors.dark.base
        }
        barStyle={theme.mode == "light" ? "dark-content" : "light-content"}
      />
      <TouchableOpacity
        onPress={() => {
          setTabBarShowing(true);
          navigation.navigate("Home");
        }}
        style={style.goBack}
      >
        <Feather
          name="arrow-left"
          color={theme.mode === "dark" ? colors.light.base : colors.dark.base}
          style={{ fontSize: 20 }}
        />
        <Text style={style.backText}>&nbsp;Back</Text>
      </TouchableOpacity>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <ThemeText style={{ fontSize: 16, fontWeight: "600" }}>
          {route.params.coinName}{" "}
        </ThemeText>
        <Image source={{ uri: route.params.coinLogo }} style={style.coinLogo} />
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
  backText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.swing,
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
  coinLogo: {
    height: 20,
    width: 20,
    position: "absolute",
    right: -20,
  },
});

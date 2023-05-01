import { useContext } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Header from "../components/Header";
import ScreenContainer from "../components/ScreenContainer";
import ThemeText from "../components/ThemeText";
import Feather from "react-native-vector-icons/Feather";
import { ThemeContext } from "../hooks/ThemeContext";
import { colors } from "../styles/colors";

const heigth = Dimensions.get("window").height;

function NoInternet() {
  const { theme } = useContext(ThemeContext);
  return (
    <ScreenContainer>
      <Header />
      <View style={styles.container}>
        <Feather
          name="wifi-off"
          style={{fontSize:60}}
          color={theme.mode === "light" ? colors.dark.base : colors.light.base}
        />
        <View style={styles.spacer} />
        <ThemeText style={styles.offlineText}>
          Looks like youre offline...
        </ThemeText>
      </View>
    </ScreenContainer>
  );
}

export default NoInternet;
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: heigth - 180,
    paddingHorizontal: 70,
  },
  offlineText: { fontSize: 20, fontWeight: "700" },
  spacer: {
    height: 60,
  },
});

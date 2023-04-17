import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import SocialGraph from "./SocialGraph";
import { useContext } from "react";
import { ThemeContext } from "../hooks/ThemeContext";
import { colors } from "../styles/colors";
import ThemeText from "./ThemeText";
import SocialChart from "./SocialChart/SocialChart";
export default function SocialCard({
  color,
  name,
  image,
  routeColor,
  ...props
}) {
  const { theme } = useContext(ThemeContext);
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            theme.mode === "light" ? colors.light.base : colors.dark.high,
        },
      ]}
    >
      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Image style={{ width: 30, height: 30 }} source={image} />
        <ThemeText style={{ fontWeight: "500", fontSize: 15, marginLeft: 5 }}>
          {name}
        </ThemeText>
      </View>
      <ThemeText style={{ marginTop: 3, fontSize: 12 }}>
        Total:
        <ThemeText style={{ fontWeight: "700", fontSize: 15 }}>19M</ThemeText>
      </ThemeText>
      <SocialChart routeColor={""} data={[]} gridMin={0} gridMax={60} />
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 12,
    padding: 10,
    display: "flex",
    flexDirection: "column",
  },
});

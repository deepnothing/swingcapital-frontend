import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import SocialGraph from "./SocialGraph";
import { useContext } from "react";
import { ThemeContext } from "../hooks/ThemeContext";
import { colors } from "../styles/colors";
import ThemeText from "./ThemeText";
import SocialChart from "./SocialChart/SocialChart";
import { apx, numberWithCommas } from "../utilities/utilities";
import { errorMessage } from "../config/text";

export default function SocialCard({
  color,
  name,
  image,
  data,
  total,
  chartStyle,
  error,
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
        <ThemeText style={{ fontWeight: "700", fontSize: 15, marginLeft: 5 }}>
          {" "}
          {name}
        </ThemeText>
      </View>
      <ThemeText style={{ marginTop: 6, marginBottom: 17, fontSize: 12 }}>
        {" "}
        Total:{" "}
        <ThemeText style={{ fontWeight: "500", color: "grey", fontSize: 13 }}>
          {numberWithCommas(total)}
        </ThemeText>
      </ThemeText>
      {error ? (
        <View
          style={[
            [
              chartStyle,
              {
                height: apx(280),
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            ],
          ]}
        >
          <Text>{errorMessage}</Text>
        </View>
      ) : (
        <SocialChart
          routeColor={color}
          data={data ? data : []}
          gridMin={0}
          gridMax={60}
          chartStyle={chartStyle}
        />
      )}

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
    marginBottom: 15,
  },
});

import { View, Image, StyleSheet } from "react-native";
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
  gridMin,
  gridMax,
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
        {image}
        <ThemeText style={{ fontWeight: "700", fontSize: 15, marginLeft: 5 }}>
          {" "}
          {name}
        </ThemeText>
      </View>
      <ThemeText style={{ marginTop: 6, marginBottom: 17, fontSize: 12 }}>
        {" "}
        Total:{" "}
        <ThemeText style={{ fontWeight: "500", fontSize: 13 }}>
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
          <ThemeText>{errorMessage}</ThemeText>
        </View>
      ) : (
        <SocialChart
          routeColor={color}
          data={data ? data : []}
          gridMin={gridMin}
          gridMax={gridMax}
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

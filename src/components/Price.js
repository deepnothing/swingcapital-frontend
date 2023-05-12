import { useContext, useState } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { ThemeContext } from "../hooks/ThemeContext";
import { colors } from "../styles/colors";
import SocialChart from "./SocialChart/SocialChart";
import ThemeText from "./ThemeText";

export default function Price({ data, color, symbol }) {
  const { theme } = useContext(ThemeContext);

  const [price, setPrice] = useState(data.slice(-30));

  const formattedArr = () => {
    const tempArr = [];
    for (let i = 0; i < price.length; i++) {
      tempArr.push({
        time: price[i][0] / 1000,
        value: price[i][1],
      });
    }
    return tempArr;
  };

  return (
    <View
      style={[
        styles.wrapper,
        {
          backgroundColor:
            theme.mode === "light" ? colors.light.base : colors.dark.high,
        },
      ]}
    >
      <View style={styles.row}>
        <ThemeText
          style={{ fontSize: Platform.isPad ? 30 : 15, fontWeight: "600" }}
        >
          {symbol.toUpperCase()} / USD
        </ThemeText>
        <ThemeText
          style={{ fontSize: Platform.isPad ? 30 : 15, color: "#617485" }}
        >
          Daily - 30 days
        </ThemeText>
      </View>

      <View style={styles.chartContainer}>
        <SocialChart routeColor={color} data={formattedArr()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    alignSelf: "center",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 15,
    borderRadius: 11,
  },
  chartContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 7,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
    paddingVertical: 8,
  },
});

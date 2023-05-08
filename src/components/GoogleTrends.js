import { useState, useContext } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import SocialChart from "./SocialChart/SocialChart";
import ThemeText from "./ThemeText";
import { ThemeContext } from "../hooks/ThemeContext";
import IntervalPicker from "./IntervalPicker";
import { colors } from "../styles/colors";
import { apx } from "../utilities/utilities";
import { errorMessage } from "../config/text";

export default function GoogleTrends(props) {
  const { theme } = useContext(ThemeContext);

  const { data, routeColor } = props;

  const [interval, setInterval] = useState("Week");

  const interValLabels = ["Day", "Week"];

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
      <View style={styles.googleHeader}>
        <View>
          <ThemeText style={{ fontSize: 16, fontWeight: "600" }}>
            <Text style={{ color: "#4285F4" }}>G</Text>
            <Text style={{ color: "#DB4437" }}>o</Text>
            <Text style={{ color: "#F4B400" }}>o</Text>
            <Text style={{ color: "#4285F4" }}>g</Text>
            <Text style={{ color: "#0F9D58" }}>l</Text>
            <Text style={{ color: "#DB4437" }}>e</Text> Search Trends
          </ThemeText>
        </View>
        <IntervalPicker
          highlightColor={colors.swing}
          interval={interval}
          intervalLabels={interValLabels}
          setInterval={setInterval}
        />
      </View>
      <View style={styles.chartContainer}>
        {data.length > 0 ? (
          <SocialChart
            data={interval === "Week" ? data : data.slice(-24)}
            routeColor={routeColor}
            interval={interval}
            gridMax={100}
            gridMin={0}
          />
        ) : (
          <View
            style={{
              height: apx(300),
              display: "flex",
              justifyContent: "center",
            }}
          >
            {props.error ? (
              <ThemeText>{errorMessage}</ThemeText>
            ) : (
              <ActivityIndicator size="small" color={`rgb(${routeColor})`} />
            )}
          </View>
        )}
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
    marginBottom: 15,
    borderRadius: 11,
  },
  googleHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingHorizontal: 10,
    width: "100%",
  },
  chartContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 7,
  },
});

import { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import SocialChart from "./SocialChart/SocialChart";
import ThemeText from "./ThemeText";
import { ThemeContext } from "../hooks/ThemeContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import IntervalPicker from "./IntervalPicker";
import { colors } from "../styles/colors";

export default function GoogleTrends(props) {
  const { theme } = useContext(ThemeContext);

  const { data, routeColor } = props;
  const [interval, onIntervalChange] = useState("Week");
  const apx = (size = 0) => {
    let width = Dimensions.get("window").width;
    return (width / 750) * size;
  };

  const interValLabels = ["Day", "Week", "Month"];

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
          interval={interval}
          intervalLabels={interValLabels}
          onIntervalChange={onIntervalChange}
        />
      </View>
      <View style={styles.charContainer}>
        {data.length > 0 ? (
          <SocialChart data={data} routeColor={routeColor} />
        ) : (
          <View
            style={{
              height: apx(300),
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator size="small" color={`rgb(${routeColor})`} />
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
  charContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 7,
  },
});

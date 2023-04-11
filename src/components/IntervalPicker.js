import { View, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../styles/colors";
import ThemeText from "./ThemeText";
import { useContext } from "react";
import { ThemeContext } from "../hooks/ThemeContext";

export default function IntervalPicker({
  interval,
  intervalLabels,
  onIntervalChange,
}) {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={styles.trendSelectContainer}>
      {intervalLabels.map((i) => (
        <TouchableOpacity
          onPress={() => onIntervalChange(i)}
          style={[
            styles.trendSelect,
            { backgroundColor: interval === i ? colors.swing : "transparent" },
          ]}
        >
          <ThemeText
            style={[
              styles.trendText,
              interval === i
                ? {
                    color:
                      theme.mode === "light"
                        ? colors.light.base
                        : colors.dark.base,
                  }
                : {},
            ]}
          >
            {i}
          </ThemeText>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  trendSelectContainer: {
    display: "flex",
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 1.5,
    borderColor: "#ccc1cc",
    alignItems: "center",
    justifyContent: "space-around",
  },
  trendSelect: {
    fontWeight: "500",
    borderRadius: 5,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginVertical: 1.5,
    paddingVertical: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  trendText: {
    fontSize: 12,
  },
});

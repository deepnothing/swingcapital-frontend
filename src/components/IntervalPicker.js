import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function IntervalPicker({
  interval,
  intervalLabels,
  onIntervalChange,
}) {
  return (
    <View style={styles.trendSelectContainer}>
      {intervalLabels.map((i) => (
        <TouchableOpacity
          onPress={() => onIntervalChange(i)}
          style={[
            styles.trendSelect,
            { backgroundColor: interval === i ? "#FFC72c" : "#FFF" },
          ]}
        >
          <Text
            style={[
              styles.trendText,
              { color: interval === i ? "#FFF" : "#000" },
            ]}
          >
            {i}
          </Text>
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

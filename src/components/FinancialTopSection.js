import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function FinancialTopSection({
  route,
  timeFrames,
  timeFrame,
  setTimeFrame,
}) {
  const timeFrameStyles = (timeFrame, self) => {
    return [
      styles.timeBox,
      timeFrame === self ? { backgroundColor: "#CACACA" } : null,
    ];
  };

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: 40,
        justifyContent: "space-evenly",
      }}
    >
      <View style={{ display: "flex", flexDirection: "row", marginTop: 5 }}>
        <Text
          style={[
            styles.titleText,
            { color: `rgb(${route.params.coinColor})` },
          ]}
        >
          {route.params.coinName.toUpperCase()}
        </Text>
        <Text style={styles.titleText}> / USD</Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          borderRadius: 10,
          borderWidth: 1,
          overflow: "hidden",
          backgroundColor: "white",
        }}
      >
        {timeFrames.map((i) => (
          <TouchableOpacity onPress={() => setTimeFrame(i)}>
            <Text style={timeFrameStyles(timeFrame, i)}>{i}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    // transform: [{ scale: 0.9 }],
    zIndex: -1,
  },
  titleText: {
    fontWeight: "600",
    fontSize: 15,
  },
  timeBox: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontSize: 10,
  },
});

import { useState } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LineGraph } from "react-native-graph";
const { width, height } = Dimensions.get("window");

const TouchMove = (props) => {
  const [isTouched, setIsTouched] = useState(false);

  const handleTouchMove = () => {
    setIsTouched(true);
  };

  const handleTouchEnd = () => {
    setIsTouched(false);
  };

  return (
    <TouchableOpacity
      style={props.style}
      onTouchStart={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    />
  );
};

export default function BubbleBarGraph({ bars }) {
  function calculateAveragesAndChanges(data) {
    const numPeriods = data.length / 24;
    const output = [];
    for (let i = 0; i < numPeriods; i++) {
      const startIndex = i * 7;
      const endIndex = startIndex + 6;
      const values = data
        .slice(startIndex, endIndex + 1)
        .map((obj) => obj.value[0]);
      const sum = values.reduce((acc, val) => acc + val);
      const avg = sum / values.length;
      const firstVal = values[0];
      const lastVal = values[values.length - 1];
      const changePct = ((lastVal - firstVal) / firstVal) * 100;
      const startDate = data[startIndex].formattedTime;
      const endDate = data[endIndex].formattedTime;
      output.push({
        startDate,
        endDate,
        averageValue: avg,
        changePercentage: changePct,
      });
    }
    return output;
  }
  return (
    <View style={styles.wrapper}>
      <View style={styles.barWrapper}>
        {calculateAveragesAndChanges(bars).map((i) => (
          <TouchMove
            time={i.time}
            style={[
              styles.bar,
              {
                height: `${i.averageValue}%`,
                width: 20,
                // opacity: i.value / 80,
                backgroundColor: i.changePercentage < 0 ? "red" : "#008000",
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: width * 0.75,
    alignSelf: "center",
    position: "relative",
    display: "flex",
    justifyContent: "flex-end",
    borderBottomWidth: 3,
    borderColor:"",
    height: 100,
    overflow: "hidden",
    backgroundColor: "#FFF",
  },
  barWrapper: {
    position: "relative",
    display: "flex",
    height: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  bar: {
    position: "relative",
    display: "flex",
    backgroundColor: "#038aff",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});

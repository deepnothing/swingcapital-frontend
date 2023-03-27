import { useEffect, useState } from "react";
import { View, StyleSheet, Text, Dimensions, Image } from "react-native";
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

export default function GoogleTrends({ bars, routeColor }) {
  function calculateAveragesAndChanges(data) {
    const numPeriods = data?.length / 12;
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
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          height: "15%",
          alignSelf: "flex-start",
        }}
      >
        <Image
          style={{ aspectRatio: 3, width: "15%" }}
          source={require("../../assets/google-logo.png")}
        />
        <Text style={{ fontSize: "12%" }}> Search Trends last 7 days</Text>
      </View>
      <View style={styles.barWrapper}>
        {bars.map((i, index) => (
          <TouchMove
            key={index}
            time={i.time}
            style={[
              styles.bar,
              {
                height: `${i.value}%`,
                width: 1,
                // opacity: i.value / 80,
                //backgroundColor: i.changePercentage < 0 ? "red" : "#008000",
                backgroundColor: `rgb(${routeColor})`,
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
    width: "100%",
    alignSelf: "center",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: 100,
    // borderWidth: 1,
    marginVertical: 10,
    // backgroundColor: "#FFF",
  },
  barWrapper: {
    position: "relative",
    display: "flex",
    height: "85%",
    width: "100%",
    borderBottomWidth: 3,
    // borderWidth: 1,
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

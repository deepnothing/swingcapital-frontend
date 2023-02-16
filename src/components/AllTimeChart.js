import { useState, useEffect, lazy, suspense } from "react";
import { View, Text } from "react-native";
import { LineChart, AreaChart } from "react-native-svg-charts";
import { Palette } from "react-native-palette";

export default function AllTimeChart({ data }) {
  // for performance reasons we are only taking the prices for every third day to use on the homescreen charts
  const [strippedArray, setNewArr] = useState(() => {
    const tempArr = [];
    for (let i = 2; i < data.prices.length; i += 3) {
      tempArr.push(data.prices[i][1]);
    }
    return tempArr;
  });
  const fill = `rgb(${data.color},0.3)`;

  const chartHeight = 62;

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <View
        style={{
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#BABABA",
          borderRadius: 10,
          height: chartHeight,
          width: 120,
          paddingTop: 2,
        }}
      >
        <AreaChart
          style={{ height: chartHeight }}
          data={strippedArray}
          svg={{ fill }}
          contentInset={{ top: 0, bottom: 0 }}
        >
          <LineChart
            style={{ height: chartHeight }}
            data={strippedArray}
            svg={{ stroke: `rgb(${data.color})`, strokeWidth: 1 }}
            contentInset={{ top: 0, bottom: 0 }}
          ></LineChart>
        </AreaChart>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          borderColor: "red",
          paddingTop: 2,
        }}
      >
        <Text style={{ color: "#000", fontSize: 8 }}>
          {new Date(data.prices[0][0]).getFullYear()}
        </Text>
        <Text style={{ color: "#000", fontSize: 8 }}>
          {new Date(data.prices[data.prices.length - 1][0]).getFullYear()}
        </Text>
      </View>
    </View>
  );
}
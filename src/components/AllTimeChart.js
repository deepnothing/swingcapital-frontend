import { useState, useEffect, lazy, suspense } from "react";
import { View, Text } from "react-native";
import { LineChart, AreaChart } from "react-native-svg-charts";
import { LinearGradient, Stop } from "react-native-svg";

import { Palette } from "react-native-palette";

export default function AllTimeChart({ data }) {
  // for performance reasons we are only taking the prices for every third day to use on the homescreen charts
  const [strippedArray, setNewArr] = useState(() => {
    const tempArr = [];
    // use timeinterval to only get the graph data every X day to increase rendering speeds
    const timeInterval = 25;
    for (let i = 2; i < data.prices.length; i += timeInterval) {
      tempArr.push(data.prices[i][1]);
    }
    return tempArr;
  });
  const fill = `rgb(${data.color},0.3)`;

  const chartHeight = 45;
  // Define your gradient colors
  const gradientColors = [
    { offset: "0%", color: "rgba(255, 0, 0, 1)" },
    { offset: "50%", color: "rgba(255, 0, 0, 0.5)" },
    { offset: "100%", color: "rgba(255, 0, 0, 0)" },
  ];

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
          borderColor: "#BABABA",
          borderRadius: 6,
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
        <Text style={{ color: "#000", fontSize: 7 }}>
          {new Date(data.prices[0][0]).getFullYear()}
        </Text>
        <Text style={{ color: "#000", fontSize: 7 }}>
          {new Date(data.prices[data.prices.length - 1][0]).getFullYear()}
        </Text>
      </View>
    </View>
  );
}

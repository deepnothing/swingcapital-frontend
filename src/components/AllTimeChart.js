import { useState } from "react";
import { View } from "react-native";
import { LineChart, AreaChart } from "react-native-svg-charts";
import ThemeText from "./ThemeText";

export default function AllTimeChart({ data, color, timeGap }) {
  // for performance reasons we are only taking the prices for every third day to use on the homescreen charts
  const [strippedArray, setNewArr] = useState(() => {
    const tempArr = [];
    // use timeinterval to only get the graph data every X day to increase rendering speeds
    const timeInterval = timeGap;
    for (let i = 0; i < data.length; i += timeInterval) {
      tempArr.push(data[i][1]);
    }
    return tempArr;
  });

  const chartHeight = 45;

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        width: "85%",
      }}
    >
      <View
        style={{
          overflow: "hidden",
          height: chartHeight,
          paddingTop: 2,
        }}
      >
        <AreaChart
          style={{ height: chartHeight }}
          data={strippedArray}
          //svg={{ fill: "url(#gradient)" }}
          // svg={{ fill }}
          contentInset={{ top: 0, bottom: 5 }}
        >
          <LineChart
            style={{ height: chartHeight }}
            data={strippedArray}
            svg={{ stroke: `rgb(${color})`, strokeWidth: 2 }}
            contentInset={{ top: 0, bottom: 5 }}
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
        <ThemeText style={{ fontSize: 8 }}>
          {new Date(data[0][0]).getFullYear()}
        </ThemeText>
        <ThemeText style={{ fontSize: 8 }}>
          {new Date(data[data.length - 1][0]).getFullYear()}
        </ThemeText>
      </View>
    </View>
  );
}

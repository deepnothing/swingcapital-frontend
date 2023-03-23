import { useState } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import Feather from "react-native-vector-icons/Feather";
const data = [{ value: 50 }, { value: 80 }, { value: 90 }, { value: 70 }];

export default function Instagram() {
  const [chartHeight, setChartHeight] = useState(0);
  const [chartWidth, setChartWidth] = useState(0);
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0,
    fillShadowGradientFrom: `rgba(193, 53, 132)`,
    fillShadowGradientT: `rgba(193, 53, 132)`,
    fillShadowGradientFromOpacity: 0.5,
    fillShadowGradientToOpacity: 0.5,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(193, 53, 132)`,
    labelColor: (opacity = 1) => `rgba(0,0,0)`,
    strokeWidth: 6, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
    propsForDots: {
      r: "5",
      strokeWidth: "2",
      stroke: "#FFF",
    },
  };
  const find_dimesions = (layout) => {
    const { x, y, width, height } = layout;
    // console.warn(x);
    // console.warn(y);
    console.log(width, height);
    setChartWidth(width);
    setChartHeight(height);
  };
  return (
    <View style={styles.container}>
      <View
        onLayout={(event) => find_dimesions(event.nativeEvent.layout)}
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Image
          style={{ width: 30, height: 30 }}
          source={require("../../assets/instagram.png")}
        />
        <Text> Instagram</Text>
      </View>
      <Text style={{ marginTop: 3, fontSize: 12 }}>
        Total Posts:<Text style={{ fontWeight: "700",fontSize: 15 }}>19M</Text>
      </Text>
      <View
        style={{
          // borderWidth: 1,
          height: 100,
        }}
      >
        <LineChart
        
          withHorizontalLines={false}
          withVerticalLines={false}
          data={{
            labels: ["3pm", "4pm", "5pm", "6pm", "7pm", "8pm"],
            datasets: [
              {
                data: [10, 9, 3, 7, 4, 5],
              },
            ],
          }}
          width={400} // from react-native
          height={200}
          // yAxisLabel="$"
          // yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={chartConfig}
          bezier
          style={{
            position: "absolute",
            // borderWidth: 1,
            left: "-65%",
            top: "-25%",
            transform: [{ scale: 0.56 }],
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    width: "50%",
    aspectRatio: 1,
    borderRadius: 12,
    marginHorizontal: 15,
    padding: 10,
    display: "flex",
    flexDirection: "column",
  },
});

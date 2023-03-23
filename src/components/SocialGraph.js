import { View } from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function SocialGraph({ color }) {
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0,
    fillShadowGradientFrom: color,
    fillShadowGradientT: color,
    fillShadowGradientFromOpacity: 0.5, 
    fillShadowGradientToOpacity: 0.5,
    decimalPlaces: 0,
    color: (opacity = 1) => color,
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
  return (
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
              data: [10, 9, 3, 7, 4, 5,0],
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
          left: "-75%",
          top: "-40%",
          transform: [{ scale: 0.53 }],
        }}
      />
    </View>
  );
}

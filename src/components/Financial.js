import { StyleSheet, View, FlatList } from "react-native";
import Slider from "@react-native-community/slider";

import data from "./Stats/data.json";

import Chart, { size } from "./Stats/Chart";
import Values from "./Stats/Values";
import Line from "./Stats/Line";
import Label from "./Stats/Label";
import { Candle } from "./Stats/Candle";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import FinancialTopSection from "./FinancialTopSection";
import Card from "./Card";
import Strategy from "./Strategy";

// const [x, y, state] = useValues(0, 0, State.UNDETERMINED);
// const gestureHandler = onGestureEvent({
//   x,
//   y,
//   state,
// });
// const caliber = size / candles.length;
// const translateY = diffClamp(y, 0, size);
// const translateX = add(sub(x, modulo(x, caliber)), caliber / 2);
// const opacity = eq(state, State.ACTIVE);

export default function Financial({ route }) {
  const [dateRange, setDateRange] = useState(20);
  const [dateStart, setDateStart] = useState(0);
  const [portionSize, setPortionSize] = useState(100);
  const [portionIndex, setPortionIndex] = useState(1);
  const [timeFrame, setTimeFrame] = useState("15m");

  function portion(array, portionSize, portionIndex) {
    const start = portionIndex * portionSize;
    const end = start + portionSize;
    return array.slice(start, end);
  }

  const timeFrames = ["1m", "15m", "1H", "4H", "1D"];

  const getDomain = (rows) => {
    const values = rows.map(({ high, low }) => [high, low]).flat();
    return [Math.min(...values), Math.max(...values)];
  };

  const candles = portion(data, portionSize, portionIndex);

  const domain = getDomain(candles);

  const strategies = [
    { heading: "Trend pullback", description: "hehbhbehbedhb" },
    { heading: "Support & Resistance", description: "hehbhbehbedhb" },
  ];

  return (
    <View style={styles.chartContainer}>
      <Chart {...{ candles, domain }} />
      <FinancialTopSection
        route={route}
        timeFrames={timeFrames}
        timeFrame={timeFrame}
        setTimeFrame={setTimeFrame}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <FlatList
          data={strategies}
          renderItem={({ item }) => (
            <Strategy heading={item.heading} description={item.description} />
          )}
          keyExtractor={(item, index) => index}
          contentContainerStyle={{ paddingHorizontal: 2, marginHorizontal: 15 }}
        />
      </View>
    </View>
  );
}

//  <Animated.View style={{ opacity }} pointerEvents="none">
//           <Values {...{ candles, translateX, caliber }} />
//         </Animated.View>

const styles = StyleSheet.create({
  chartContainer: {
    // transform: [{ scale: 0.9 }],
    zIndex: -1,
  },
});

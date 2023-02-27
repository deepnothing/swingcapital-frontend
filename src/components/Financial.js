import { StyleSheet, View, SafeAreaView } from "react-native";
import Slider from "@react-native-community/slider";

import data from "./Stats/data.json";

import Chart, { size } from "./Stats/Chart";
import Values from "./Stats/Values";
import Line from "./Stats/Line";
import Label from "./Stats/Label";
import { Candle } from "./Stats/Candle";
import { useState } from "react";

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

export default function Financial() {
  const [dateRange, setDateRange] = useState(20);
  const [dateStart,setDateStart]=useState(0)

  const candles = data.slice(0, dateRange);
  const getDomain = (rows) => {
    const values = rows.map(({ high, low }) => [high, low]).flat();
    return [Math.min(...values), Math.max(...values)];
  };
  const domain = getDomain(candles);
  return (
    <View style={styles.chartContainer}>
      <Chart {...{ candles, domain }} />
      {/* <PanGestureHandler minDist={0} {...gestureHandler}>
          <Animated.View style={StyleSheet.absoluteFill}>
            <Animated.View
              style={{
                transform: [{ translateY }],
                opacity,
                ...StyleSheet.absoluteFillObject,
              }}
            >
              <Line x={size} y={0} />
            </Animated.View>
            <Animated.View
              style={{
                transform: [{ translateX }],
                opacity,
                ...StyleSheet.absoluteFillObject,
              }}
            >
              <Line x={0} y={size} />
            </Animated.View>
            <Label y={translateY} {...{ size, domain, opacity }} />
          </Animated.View>
        </PanGestureHandler>  */}
      <Slider
        minimumValue={1}
        maximumValue={20}
        step={1}
        value={dateStart}
        onValueChange={(value) => {
          console.log(dateRange);
          // setDateRange(value);
          setDateStart(value)
        }}
      />
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

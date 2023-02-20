import React from "react";
import { StyleSheet, View,SafeAreaView } from "react-native";
// import { PanGestureHandler, State } from "react-native-gesture-handler";
// import Animated, {
//   add,
//   diffClamp,
//   eq,
//   modulo,
//   sub,
// } from "react-native-reanimated";
// import { onGestureEvent, useValues } from "react-native-redash";

import data from "../Stats/data.json";
import Chart, { size } from "../Stats/Chart";
import Values from "../Stats/Values";
import Line from "../Stats/Line";
import Label from "../Stats/Label";
import { Candle } from "../Stats/Candle";
import Header from "../components/Header";

const candles = data.slice(0, 20);

const getDomain = (rows) => {
  const values = rows.map(({ high, low }) => [high, low]).flat();
  return [Math.min(...values), Math.max(...values)];
};
const domain = getDomain(candles);
export default ({route,navigation}) => {
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
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Header navigation={navigation}route={route} />
        {/* <Animated.View style={{ opacity }} pointerEvents="none">
          <Values {...{ candles, translateX, caliber }} />
        </Animated.View> */}
      </SafeAreaView>
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
        </PanGestureHandler> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "black",
  },
  chartContainer:{
    borderWidth:1,
  }
});

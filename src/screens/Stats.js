import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
// import { PanGestureHandler, State } from "react-native-gesture-handler";
// import Animated, {
//   add,
//   diffClamp,
//   eq,
//   modulo,
//   sub,
// } from "react-native-reanimated";
// import { onGestureEvent, useValues } from "react-native-redash";

import data from "../components/Stats/data.json";
import Chart, { size } from "../components/Stats/Chart";
import Values from "../components/Stats/Values";
import Line from "../components/Stats/Line";
import Label from "../components/Stats/Label";
import { Candle } from "../components/Stats/Candle";
import StatsHeader from "../components/StatsHeader";
import Financial from "../components/Financial";

export default ({ route, navigation }) => {
  const [selectedMetric, setSelectedMetric] = useState("finance");

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatsHeader
          navigation={navigation}
          route={route}
          selectedMetric={selectedMetric}
          setSelectedMetric={setSelectedMetric}
        />
        {selectedMetric === "finance" ? <Financial /> : <View />}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

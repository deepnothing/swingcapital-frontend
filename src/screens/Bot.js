import React, { useState } from "react";
import { Text, Pressable, View, SafeAreaView, Dimensions } from "react-native";

import {
  LineChart,
  Line,
  YAxis,
  XAxis,
  AreaChart,
} from "react-native-svg-charts";
import * as d3 from "d3";

const screenWidth = Dimensions.get("window").width;

function BotScreen() {
  return <SafeAreaView style={{ marginTop: 300 }}></SafeAreaView>;
}

export default BotScreen;

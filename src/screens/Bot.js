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
import Header from "../components/Header";
import SwingCapitalText from "../components/SwingCapital";
import BubbleBarGraph from "../components/BubbleBarGraph";

const screenWidth = Dimensions.get("window").width;
const data = require('./dummy.json');
function BotScreen() {
  return (
    <View>
      <Header>{/* <SwingCapitalText text="Bots" /> */}</Header>
      <BubbleBarGraph bars={data.default.timelineData} />
    </View>
  );
}

export default BotScreen;

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

const screenWidth = Dimensions.get("window").width;
function BotScreen() {
  return (
    <View>
      <Header>{/* <SwingCapitalText text="Bots" /> */}</Header>
    
    </View>
  );
}

export default BotScreen;

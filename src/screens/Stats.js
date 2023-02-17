import React, { useState } from "react";
import {
  Text,
  Pressable,
  View,
  SafeAreaView,
  Dimensions,
  StatusBar,
} from "react-native";
import Header from "../components/stats/Header";
// import { CandlestickChart } from 'react-native-wagmi-charts';


function StatsScreen({navigation,route}) {
  const data = [
    {
      timestamp: 1625945400000,
      open: 33575.25,
      high: 33600.52,
      low: 33475.12,
      close: 33520.11,
    },
    {
      timestamp: 1625946300000,
      open: 33545.25,
      high: 33560.52,
      low: 33510.12,
      close: 33520.11,
    },
    {
      timestamp: 1625947200000,
      open: 33510.25,
      high: 33515.52,
      low: 33250.12,
      close: 33250.11,
    },
    {
      timestamp: 1625948100000,
      open: 33215.25,
      high: 33430.52,
      low: 33215.12,
      close: 33420.11,
    },
  ];
  return (
    <SafeAreaView>
      <StatusBar />
      <Header navigation={navigation}route={route} />
      {/* <CandlestickChart.Provider data={data}>
      <CandlestickChart>
        <CandlestickChart.Candles />
      </CandlestickChart>
    </CandlestickChart.Provider> */}
    </SafeAreaView>
  );
}

export default StatsScreen;

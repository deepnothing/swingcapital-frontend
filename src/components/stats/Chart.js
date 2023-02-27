import React from "react";
import { Dimensions, View } from "react-native";
import { Svg } from "react-native-svg";
import { scaleLinear } from "d3-scale";

import Candle from "./Candle";

export const size = Dimensions.get("window").width;

export default ({ candles, domain }) => {
  const width = size / candles.length;
  const scaleY = scaleLinear().domain(domain).range([size, 0]);
  const scaleBody = scaleLinear()
    .domain([0, Math.max(...domain) - Math.min(...domain)])
    .range([0, size]);
  return (
    <View style={{borderWidth:2}}>
      <Svg width={size} height={size}>
        {candles.map((candle, index) => (
          <Candle
            key={candle.date}
            {...{ candle, index, width, scaleY, scaleBody }}
          />
        ))}
      </Svg>
    </View>
  );
};

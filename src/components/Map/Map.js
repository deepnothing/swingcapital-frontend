import React, { useState, useEffect, useMemo } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
//LIBRARIES
import Svg, { G, Path, Circle } from "react-native-svg";
import * as d3 from "d3";
import { geoCylindricalStereographic } from "d3-geo-projection";
//CONSTANTS
import { COUNTRIES } from "./CountryShapes";
const Map = (props) => {
  const { dimensions } = props;
  const [countryList, setCountryList] = useState([]);
  const mapExtent = useMemo(() => {
    return dimensions.width > dimensions.height / 2
      ? dimensions.height / 2
      : dimensions.width;
  }, [dimensions]);
  const countryPaths = useMemo(() => {
    const projection = geoCylindricalStereographic()
      .translate([dimensions.width / 2, dimensions.height / 5])
      .scale(dimensions.width / 6);

    const geoPath = d3.geoPath().projection(projection);
    const svgPaths = COUNTRIES.map(geoPath);
    return svgPaths;
  }, [dimensions]);
  useEffect(() => {
    setCountryList(
      countryPaths.map((path, i) => {
        return (
          <Path
            key={COUNTRIES[i].properties.name}
            d={path}
            stroke={"#aaa"}
            strokeOpacity={0.3}
            strokeWidth={0.6}
            fill={"#aaa"}
            opacity={0.4}
          />
        );
      })
    );
  }, []);
  return (
    <View>
      <Svg width={dimensions.width} height={dimensions.height / 2}>
        <G>{countryList.map((x) => x)}</G>
      </Svg>
    </View>
  );
};
export default Map;

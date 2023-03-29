import React, { useState, useEffect, useMemo } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Svg, { G, Path, Circle } from "react-native-svg";
import * as d3 from "d3";
import { geoCylindricalStereographic } from "d3-geo-projection";
import SvgPanZoom, { SvgPanZoomElement } from "react-native-svg-pan-zoom";
import { COUNTRIES } from "./CountryShapes";

const Map = (props) => {
  const { dimensions, routeColor, data } = props;
  const [countryList, setCountryList] = useState([]);
  const mapExtent = useMemo(() => {
    return dimensions.width > dimensions.height / 2
      ? dimensions.height / 2
      : dimensions.width;
  }, [dimensions]);
  const countryPaths = useMemo(() => {
    const projection = geoCylindricalStereographic()
      .translate([dimensions.width / 2, dimensions.height / 8])
      .scale(dimensions.width / 4);

    const geoPath = d3.geoPath().projection(projection);
    const svgPaths = COUNTRIES.map(geoPath);
    return svgPaths;
  }, [dimensions]);

  useEffect(() => {
    setCountryList(
      countryPaths.map((path, i) => {
        if (
          data.find((item) => item.geoName === COUNTRIES[i].properties.name)
            ?.geoName == undefined
        ) {
          console.log(COUNTRIES[i].properties.name);
        }
        return (
          <SvgPanZoomElement
            // x={50}
            // y={50}
            onClick={() => {
              console.log(COUNTRIES[i].properties.name);
            }}
            onClickRelease={() => {
              console.log("onClickRelease!");
            }}
          >
            <Path
              key={COUNTRIES[i].properties.name}
              d={path}
              stroke={"#000"}
              strokeOpacity={0.3}
              strokeWidth={0.6}
              fill={`rgb(${routeColor})`}
              opacity={
                data.find(
                  (item) => item.geoName === COUNTRIES[i].properties.name
                )?.geoName
                  ? data.find(
                      (item) => item.geoName === COUNTRIES[i].properties.name
                    ).value[0] / 50
                  : 0
              }
            />
          </SvgPanZoomElement>
        );
      })
    );
  }, []);
  return (
    <View
      style={{
        borderWidth: 3,
        height: dimensions.height / 3,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SvgPanZoom
        canvasHeight={500}
        canvasWidth={dimensions.width}
        minScale={0.1}
        initialZoom={0.7}
        onZoom={(zoom) => {
          console.log("onZoom:" + zoom);
        }}
        canvasStyle={{ borderWidth: 2, height: "100%", width: "100%" }}
        viewStyle={{ backgroundColor: "green", height: "100%", width: "100%" }}
      >
        <G>{countryList.map((x) => x)}</G>
      </SvgPanZoom>
    </View>
  );
};
export default Map;

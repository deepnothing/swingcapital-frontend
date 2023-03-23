import React, { useState, useEffect, useMemo } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Svg, { G, Path, Circle } from "react-native-svg";
import * as d3 from "d3";
import { geoCylindricalStereographic } from "d3-geo-projection";
import SvgPanZoom, { SvgPanZoomElement } from "react-native-svg-pan-zoom";
import { COUNTRIES } from "./CountryShapes";

const Map = (props) => {
  const { dimensions, routeColor, data } = props;
  console.log(data[0]);
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
        console.log();
        return (
          <Path
            key={COUNTRIES[i].properties.name}
            d={path}
            stroke={"#000"}
            strokeOpacity={0.3}
            strokeWidth={0.6}
            fill={`rgb(${routeColor})`}
            opacity={
              data.find((item) => item.geoName === COUNTRIES[i].properties.name)
                ?.geoName
                ? data.find(
                    (item) => item.geoName === COUNTRIES[i].properties.name
                  ).value[0] / 100
                : 0
            }
          />
        );
      })
    );
  }, []);
  return (
    <>
      <View
        style={{
          borderWidth: 1,
          height: dimensions.height / 3,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            borderWidth: 1,
            width: "100%",
            transform: [{ scale: 0.95 }],
          }}
        >
          <Svg width={"100%"} height={"100%"}>
            <G>{countryList.map((x) => x)}</G>
          </Svg>
        </View>
      </View>

      {/* <SvgPanZoom
        minScale={0.5}
        initialZoom={1}
        maxScale={100}
        onZoom={(zoom) => {
          console.log("onZoom:" + zoom);
        }}
        canvasStyle={{
          borderWidth: 1,
          width: "100%",
          height:dimensions.height / 3,
        // transform: [{ scale: 0.95 }],
        }}
        viewStyle={{
          borderWidth: 1,
          borderColor:'red',
          display: "flex",
        //   justifyContent: "center",
        //   alignItems: "center",
          height:dimensions.height / 3
        }}
      >
        
        <SvgPanZoomElement
          onClick={() => {
            console.log("onClick!");
          }}
          onClickCanceled={() => {
            console.log("onClickCanceled!");
          }}
          onClickRelease={() => {
            console.log("onClickRelease!");
          }}
          onDrag={() => {
            console.log("onDrag!");
          }}
        >
          <G>{countryList.map((x) => x)}</G>
        </SvgPanZoomElement>
      </SvgPanZoom> */}
    </>
  );
};
export default Map;

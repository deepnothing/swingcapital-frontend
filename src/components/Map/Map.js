import React, { useState, useEffect, useMemo } from "react";
import { ActivityIndicator, StyleSheet, View, Text } from "react-native";
import Svg, { G, Path, Circle } from "react-native-svg";
import * as d3 from "d3";
import { geoCylindricalStereographic } from "d3-geo-projection";
import SvgPanZoom, { SvgPanZoomElement } from "react-native-svg-pan-zoom";
import { COUNTRIES } from "./CountryShapes";

const Map = (props) => {
  const { dimensions, routeColor, data } = props;
  const [countryList, setCountryList] = useState([]);
  const [clickedCountry, setClickedCountry] = useState();
  const mapExtent = useMemo(() => {
    return dimensions.width > dimensions.height / 2
      ? dimensions.height / 2
      : dimensions.width;
  }, [dimensions]);
  const countryPaths = useMemo(() => {
    const projection = geoCylindricalStereographic()
      .translate([dimensions.width / 0.31, dimensions.height / 1])
      .scale(dimensions.width);

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
              setClickedCountry(COUNTRIES[i].properties.name);
            }}
            onClickRelease={() => {
              console.log("onClickRelease!");
              setClickedCountry(null);
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
        height: dimensions.height / 3.5,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
      }}
    >
      {clickedCountry ? (
        <View
          style={{
            position: "absolute",
            height: 20,
            backgroundColor: "#fff",
            paddingHorizontal:10,
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        >
          <Text>
            {clickedCountry}:
            {data.find((item) => item.geoName === clickedCountry)?.geoName
              ? data.find((item) => item.geoName === clickedCountry).value[0]
              : 0}
          </Text>
        </View>
      ) : null}

      <SvgPanZoom
        canvasWidth={2700}
        canvasHeight={1500}
        minScale={0.1}
        initialZoom={0.143}
        onZoom={(zoom) => {
          console.log("onZoom:" + zoom);
        }}
        canvasStyle={{
          backgroundColor: "yellow",
          position: "absolute",
          left: "2%",
          top: "5%",
          // height: "100%",
          //height: dimensions.height / 2,
        }}
        viewStyle={{
          backgroundColor: "green",
          position: "relative",
          height: "100%",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <G>{countryList.map((x) => x)}</G>
      </SvgPanZoom>
    </View>
  );
};
export default Map;

import React, { useState, useEffect, useContext } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  Dimensions,
} from "react-native";
import Svg, { G, Path, Circle } from "react-native-svg";
import * as d3 from "d3";
import { geoCylindricalStereographic } from "d3-geo-projection";
import SvgPanZoom, { SvgPanZoomElement } from "react-native-svg-pan-zoom";
import { COUNTRIES } from "./CountryShapes";
import { ThemeContext } from "../../hooks/ThemeContext";
const dimensions = Dimensions.get("window");

const Map = (props) => {
  const { theme } = useContext(ThemeContext);
  const { routeColor, data } = props;
  const [countryList, setCountryList] = useState([]);
  const [clickedCountry, setClickedCountry] = useState();
  const countryPaths = () => {
    const projection = geoCylindricalStereographic()
      .translate([1335, 896])
      .scale(414);

    const geoPath = d3.geoPath().projection(projection);
    const svgPaths = COUNTRIES.map(geoPath);
    return svgPaths;
  };
  useEffect(() => {
    setCountryList(
      countryPaths().map((path, i) => {
        if (
          data.find((item) => item.geoName === COUNTRIES[i].properties.name)
            ?.geoName == undefined
        ) {
          // console.log(COUNTRIES[i].properties.name);
        }
        const calculatedOpacity = () =>
          data.find((item) => item.geoName === COUNTRIES[i].properties.name)
            ?.geoName
            ? data.find((item) => item.geoName === COUNTRIES[i].properties.name)
                .value[0] / 30
            : 0;

        return (
          <SvgPanZoomElement
            // x={50}
            // y={50}
            onClick={() => {
              setClickedCountry(COUNTRIES[i].properties.name);
            }}
            onClickRelease={() => {
              console.log("onClickRelease!");
              //setClickedCountry(null);
            }}
          >
            <Path
              key={COUNTRIES[i].properties.name}
              d={path}
              stroke={"#000"}
              strokeOpacity={0.3}
              strokeWidth={1}
              fill={`rgb(${routeColor})`}
              opacity={calculatedOpacity()}
            />
          </SvgPanZoomElement>
        );
      })
    );
  }, [data]);
  return (
    <View style={{ width: "100%", display: "flex", alignItems: "center" }}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.mode === "light" ? "#FFFF" : "#222c40",
          },
        ]}
        onTouchStart={() => props.setScrollEnabled(false)}
        onTouchEnd={() => props.setScrollEnabled(true)}
      >
        {clickedCountry ? (
          <View style={styles.clickedBanner}>
            <Text>
              {clickedCountry}:
              {data.find((item) => item.geoName === clickedCountry)?.geoName
                ? data.find((item) => item.geoName === clickedCountry).value[0]
                : 0}
            </Text>
          </View>
        ) : null}
        {data.length > 0 ? (
          <SvgPanZoom
            canvasWidth={2700}
            canvasHeight={1500}
            minScale={0.1}
            initialZoom={0.14}
            onZoom={(zoom) => {
              console.log("onZoom:" + zoom);
            }}
            canvasStyle={styles.svgCanvasStyle}
            viewStyle={styles.svgCanvasContainer}
          >
            <G>{countryList.map((x) => x)}</G>
          </SvgPanZoom>
        ) : (
          <ActivityIndicator size="large" color={`rgb(${routeColor})`} />
        )}
      </View>
    </View>
  );
};
export default Map;

const styles = StyleSheet.create({
  container: {
    height: 250,
    width: 400,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 11,
    transform: [{ scale: dimensions.width / 436 }],
  },
  svgCanvasStyle: {
    // backgroundColor: "yellow",
    position: "absolute",
    left: 8,
    top: 18,
  },
  svgCanvasContainer: {
    // backgroundColor: "green",
    position: "relative",
    height: "100%",
    width: "100%",
    overflow: "hidden",
    borderRadius: 8,
  },
  clickedBanner: {
    position: "absolute",
    height: 20,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    top: 0,
    left: 0,
  },
});

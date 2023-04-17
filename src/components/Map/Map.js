import React, { useState, useEffect, useContext } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
} from "react-native";
import Svg, { G, Path, Circle } from "react-native-svg";
import * as d3 from "d3";
import { geoCylindricalStereographic } from "d3-geo-projection";
import SvgPanZoom, { SvgPanZoomElement } from "react-native-svg-pan-zoom";
import { COUNTRIES } from "./CountryShapes";
import { ThemeContext } from "../../hooks/ThemeContext";
import ThemeText from "../ThemeText";
import { colors } from "../../styles/colors";
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
            key={COUNTRIES[i].properties.name}
            onClick={(e) => {
              setClickedCountry(COUNTRIES[i].properties.name);
            }}
            onClickRelease={() => {
              console.log("MapClickRelease!");
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
            backgroundColor:
              theme.mode === "light" ? colors.light.base : colors.dark.high,
          },
        ]}
        key="root"
        onTouchStart={(e) => {
          props.setScrollEnabled(false);
          if (e.target._children.length > 0) {
            setClickedCountry(null);
          }
        }}
        onTouchEnd={() => props.setScrollEnabled(true)}
      >
        {clickedCountry ? (
          <View
            style={[
              styles.clickedBanner,
              {
                backgroundColor:
                  theme.mode === "light"
                    ? colors.light.medium
                    : colors.dark.medium,
              },
            ]}
          >
            <Image
              style={styles.flagBubble}
              source={require(`../../../assets/flags/fiji.png`)}
            />
            <ThemeText style={{ fontSize: 14, fontWeight: "400" }}>
              {" "}
              {clickedCountry}{" "}
              {data.find((item) => item.geoName === clickedCountry)?.geoName
                ? data.find((item) => item.geoName === clickedCountry).value[0]
                : 0}
              {"   "}
            </ThemeText>
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
              setClickedCountry(null);
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
    marginVertical: 10,
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
    top: 0,
    right: 0,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 100,
    margin: 10,
    zIndex:3
  },
  flagBubble: {
    height: 25,
    width: 25,
    margin: 4,
    borderRadius: 200,
  },
});

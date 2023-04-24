import { useContext, useEffect, useRef, useState } from "react";
import { View, PanResponder, Dimensions, Text } from "react-native";
import { AreaChart, YAxis, XAxis } from "react-native-svg-charts";
import { Circle, G, Path, Rect, Text as SvgText } from "react-native-svg";
import * as shape from "d3-shape";
import { ThemeContext } from "../../hooks/ThemeContext";
import { colors } from "../../styles/colors";
import { abbreviateNumber } from "../../utilities/utilities";
import { apx, formatDate } from "../../utilities/utilities";

export default function SocialChart({
  data,
  routeColor,
  gridMin,
  gridMax,
  chartStyle,
}) {
  const { theme } = useContext(ThemeContext);
  const [positionX, setPositionX] = useState(-1); // The currently selected X coordinate position

  useEffect(() => {
    size.current = data.length;
  }, [data]);

  const dateList = data.map((i) => formatDate(i.time));

  const priceList = data.map((i) => i.value);

  const size = useRef(dateList.length);

  const panResponder = useRef(
    PanResponder.create({
      // Ask to be a responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderTerminationRequest: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        updatePosition(evt.nativeEvent.locationX);
        return true;
      },
      onPanResponderMove: (evt, gestureState) => {
        updatePosition(evt.nativeEvent.locationX);
        return true;
      },
      onPanResponderRelease: () => {
        setPositionX(-1);
      },
    })
  );

  const updatePosition = (x) => {
    const YAxisWidth = apx(130);
    const x0 = apx(0); // x0 position
    const chartWidth = apx(750) - YAxisWidth - x0;
    const xN = x0 + chartWidth; //xN position
    const xDistance = chartWidth / size.current; // The width of each coordinate point
    if (x <= x0) {
      x = x0;
    }
    if (x >= xN) {
      x = xN;
    }

    // console.log((x - x0) )

    // The selected coordinate x :
    // (x - x0)/ xDistance = value
    let value = ((x - x0) / xDistance).toFixed(0);
    if (value >= size.current - 1) {
      value = size.current - 1; // Out of chart range, automatic correction
    }

    setPositionX(Number(value));
  };

  const CustomLine = ({ line }) => (
    <Path
      key="line"
      d={line}
      stroke={`rgb(${routeColor})`}
      strokeWidth={apx(5)}
      fill="none"
    />
  );

  const ToolTip = ({ x, y, ticks }) => {
    if (positionX < 0) {
      return null;
    }

    const date = dateList[positionX];

    return (
      <G x={x(positionX)} key="tooltip">
        <G
          x={positionX > size.current / 2 ? -apx(270 + 10) : apx(30)}
          y={
            // make sure the tooltip doesnt go above or below the edges of the chart
            y(priceList[positionX]) < 100
              ? y(priceList[positionX]) > 25
                ? y(priceList[positionX]) - apx(10)
                : 25
              : 100
          }
        >
          <Rect
            y={-apx(24 + 24 + 20) / 2}
            rx={apx(12)} // borderRadius
            ry={apx(12)} // borderRadius
            width={apx(250)}
            height={apx(96)}
            stroke={`rgb(${routeColor})`}
            fill={`${
              theme.mode === "light"
                ? "rgba(255,255,255,0.9)"
                : "rgba(14, 19, 33,0.9)"
            }`}
          />

          <SvgText
            x={apx(20)}
            fill={theme.mode === "light" ? "#617485" : colors.light.base}
            opacity={0.65}
            fontSize={apx(24)}
          >
            {date}
          </SvgText>
          <SvgText
            x={apx(20)}
            y={apx(24 + 20)}
            fontSize={apx(24)}
            fontWeight="bold"
            fill={`rgb(${routeColor})`}
          >
            {priceList[positionX]}
          </SvgText>
        </G>

        <G x={x}>
          <Circle
            cy={y(priceList[positionX])}
            r={apx(20 / 2)}
            stroke={`rgb(${routeColor})`}
            strokeWidth={apx(4)}
            fill="#fff"
          />
        </G>
      </G>
    );
  };

  const verticalContentInset = { top: apx(20), bottom: apx(20) };

  const formatLabel = (value) => abbreviateNumber(value, 0).replace(/\s/g, "");

  return (
    <View
      style={[
        {
          flexDirection: "row",
          width: "95%",
          height: apx(280),
          alignSelf: "stretch",
        },
        chartStyle,
      ]}
    >
      <YAxis
        style={{ width: apx(55) }}
        data={[gridMin, ...priceList, gridMax]}
        formatLabel={formatLabel}
        contentInset={verticalContentInset}
        svg={{ fontSize: apx(20), fill: "#617485" }}
        numberOfTicks={4}
      />
      <View style={{ flex: 1 }} {...panResponder.current.panHandlers}>
        <AreaChart
          style={{ flex: 1 }}
          data={priceList}
          curve={shape.curveNatural}
          contentInset={{ ...verticalContentInset }}
          gridMax={gridMax}
          gridMin={gridMin}
        >
          <CustomLine />
          <ToolTip />
        </AreaChart>
      </View>
      {/* <XAxis
        style={{
          // alignSelf: "stretch",
          marginTop: apx(240),
          width: apx(600),
          position: "absolute",
          // borderWidth: 1,
          height: apx(60),
          left:apx(60)
        }}
        numberOfTicks={5}
        data={priceList}
        formatLabel={(value, index) => dateList[value]}
        svg={{
          fontSize: apx(20),
          fill: "#617485",
          y: apx(20),
          originY: 30,
        }}
      /> */}
    </View>
  );
}

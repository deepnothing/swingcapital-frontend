import { useContext, useEffect, useRef, useState } from "react";
import { Dimensions } from "react-native";
import { View, PanResponder } from "react-native";
import { AreaChart, YAxis } from "react-native-svg-charts";
import { Circle, G, Path, Rect, Text as SvgText } from "react-native-svg";
import * as shape from "d3-shape";
import { ThemeContext } from "../../hooks/ThemeContext";
import { colors } from "../../styles/colors";
export default function SocialChart({ data, routeColor, interval }) {
  const { theme } = useContext(ThemeContext);

  const apx = (size = 0) => {
    let width = Dimensions.get("window").width;
    return (width / 750) * size;
  };
  function formatUnixDate(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
    return formattedDate;
  }

  const dateList = data.map((i) => formatUnixDate(i.time));

  const priceList = data.map((i) => i.value[0]);
  const size = useRef(dateList.length);

  const [positionX, setPositionX] = useState(-1); // The currently selected X coordinate position

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
          y={y(priceList[positionX]) - apx(10)}
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

  return (
    <View
      style={{
        flexDirection: "row",
        width: "95%",
        height: apx(280),
        alignSelf: "stretch",
      }}
    >
      <YAxis
        style={{ width: apx(55) }}
        data={[0, ...priceList, 100]}
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
          gridMax={100}
          gridMin={0}
        >
          <CustomLine />
          <ToolTip />
        </AreaChart>
      </View>
    </View>
  );
}

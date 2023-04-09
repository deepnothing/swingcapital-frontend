import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  PanResponder,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { AreaChart, XAxis, YAxis } from "react-native-svg-charts";

// import { LineChart, Grid } from "react-native-svg-charts";
import * as shape from "d3-shape";
import {
  Circle,
  Defs,
  G,
  Line,
  LinearGradient,
  Path,
  Rect,
  Stop,
  Text as SvgText,
} from "react-native-svg";
export default function GoogleTrends(props) {
  const { data, routeColor } = props;
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
      // 要求成为响应者：
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

  // const CustomGrid = ({ x, y, ticks }) => (
  //   <G>
  //     {
  //       // Horizontal grid
  //       ticks.map((tick) => (
  //         <Line
  //           key={tick}
  //           x1="0%"
  //           x2="100%"
  //           y1={y(tick)}
  //           y2={y(tick)}
  //           stroke="#EEF3F6"
  //         />
  //       ))
  //     }
  //     {
  //       // Vertical grid
  //       priceList.map((_, index) => (
  //         <Line
  //           key={index.toString()}
  //           y1="0%"
  //           y2="100%"
  //           x1={x(index)}
  //           x2={x(index)}
  //           stroke="#EEF3F6"
  //         />
  //       ))
  //     }
  //   </G>
  // );

  const CustomLine = ({ line }) => (
    <Path
      key="line"
      d={line}
      stroke={`rgb(${routeColor})`}
      strokeWidth={apx(5)}
      fill="none"
    />
  );

  // const CustomGradient = () => (
  //   <Defs key="gradient">
  //     <LinearGradient id="gradient" x1="0" y="0%" x2="0%" y2="100%">
  //       {/* <Stop offset="0%" stopColor="rgb(134, 65, 244)" /> */}
  //       {/* <Stop offset="100%" stopColor="rgb(66, 194, 244)" /> */}

  //       <Stop offset="0%" stopColor="#FEBE18" stopOpacity={0.25} />
  //       <Stop offset="100%" stopColor="#FEBE18" stopOpacity={0} />
  //     </LinearGradient>
  //   </Defs>
  // );

  const Tooltip = ({ x, y, ticks }) => {
    if (positionX < 0) {
      return null;
    }

    const date = dateList[positionX];

    return (
      <G x={x(positionX)} key="tooltip">
        <G
          x={positionX > size.current / 2 ? -apx(300 + 10) : apx(10)}
          y={y(priceList[positionX]) - apx(10)}
        >
          <Rect
            y={-apx(24 + 24 + 20) / 2}
            rx={apx(12)} // borderRadius
            ry={apx(12)} // borderRadius
            width={apx(250)}
            height={apx(96)}
            stroke={`rgb(${routeColor})`}
            fill="rgba(255, 255, 255, 0.9)"
          />

          <SvgText x={apx(20)} fill="#617485" opacity={0.65} fontSize={apx(24)}>
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
          {/* <Line
            y1={ticks[0]}
            y2={ticks[Number(ticks.length)]}
            stroke="#FEBE18"
            strokeWidth={apx(4)}
            strokeDasharray={[6, 3]}
          /> */}

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
    <View style={styles.wrapper}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "flex-start",
          marginVertical: 10,
          paddingHorizontal: 10,
          width: "100%",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "600" }}>
          <Text style={{ color: "#4285F4" }}>G</Text>
          <Text style={{ color: "#DB4437" }}>o</Text>
          <Text style={{ color: "#F4B400" }}>o</Text>
          <Text style={{ color: "#4285F4" }}>g</Text>
          <Text style={{ color: "#0F9D58" }}>l</Text>
          <Text style={{ color: "#DB4437" }}>e</Text> Search Trends
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginVertical: 7,
        }}
      >
        {data.length > 0 ? (
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
                // svg={{ fill: "url(#gradient)" }}
                gridMax={100}
                gridMin={0}
              >
                <CustomLine />
                {/* <CustomGrid /> */}
                {/* <CustomGradient /> */}
                <Tooltip />
              </AreaChart>
            </View>
          </View>
        ) : (
          <View style={{ height: apx(300) }}>
            <ActivityIndicator size="small" color={`rgb(${routeColor})`} />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    alignSelf: "center",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#FFF",
    borderRadius: 11,
  },
});

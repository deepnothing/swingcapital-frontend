import { useState } from "react";
import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import InsetShadow from "react-native-inset-shadow";
import Feather from "react-native-vector-icons/Feather";
import IonIcon from "react-native-vector-icons/Ionicons";

const switchBorderRadius = 6;
const windowWidth = Dimensions.get("window").width;

function SwitchButton(props) {
  return (
    <Pressable
      onPress={() => props.setSelectedMetric(props.type)}
      style={[
        style.switchBox,
        {
          backgroundColor: props.selected === props.type ? "#FFF" : null,
        },
        props.selected === props.type
          ? {
              shadowOffset: {
                width: props.leftShadow ? -1.95 : 1.95,
                height: 0,
              },
              shadowOpacity: 0.3,
              shadowRadius: 2.6,
              elevation: 3,
              shadowColor: "#000",
            }
          : {},
      ]}
    >
      <IonIcon
        name={props.icon}
        size="25"
        color={props.selected === props.type ? props.color : "#4f4f4f"}
      />
      {/* <Text style={[style.switchText]}>$</Text> */}
    </Pressable>
  );
}

export default function Header({ navigation, route,selectedMetric,setSelectedMetric }) {
  const { coinName, coinColor } = route.params;
  return (
    <View style={style.heading}>
      <View style={style.goBack}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Feather name="arrow-left-circle" color={"#000"} size={"25"} />
        </TouchableOpacity>
        <Text style={{ fontSize: 15, fontWeight: "600", color: "#FFC72C" }}>
          &nbsp;Back
        </Text>
      </View>
      <View style={style.headerSwitch}>
        <SwitchButton
          icon="bar-chart-outline"
          type="finance"
          selected={selectedMetric}
          setSelectedMetric={setSelectedMetric}
          color="#228b22"
        />
        <SwitchButton
          leftShadow
          selected={selectedMetric}
          type="social"
          setSelectedMetric={setSelectedMetric}
          icon="chatbox-ellipses-outline"
          color="#55acee"
        />
      </View>
      <View style={style.titleInfo}>
        <Text style={[style.titleText, { color: `rgb(${coinColor})` }]}>
          {coinName.toUpperCase()}
        </Text>
        <Text style={style.titleText}> / USD</Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  heading: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: 10,
  },
  relative: {
    position: "relative",
    borderWidth: 1,
  },
  goBack: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: windowWidth / 3,
  },
  titleInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    width: windowWidth / 3,
  },
  titleText: {
    fontWeight: "600",
    fontSize: 15,
  },
  headerSwitch: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#CCCCCC",
    borderRadius: 8,
    borderColor: "#CCCCCC",
    borderWidth: 2,
  },
  switchBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: switchBorderRadius,
  },
  switchText: {
    fontSize: 12,
  },
});

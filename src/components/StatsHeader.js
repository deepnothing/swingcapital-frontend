import { useState } from "react";
import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import InsetShadow from "react-native-inset-shadow";
import Feather from "react-native-vector-icons/Feather";
import IonIcon from "react-native-vector-icons/Ionicons";
import ExchangePicker from "./ExchangePicker";

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
        size="22"
        color={props.selected === props.type ? props.color : "#4f4f4f"}
      />
    </Pressable>
  );
}

export default function StatsHeader({
  navigation,
  route,
  selectedMetric,
  setSelectedMetric,
}) {
  const { coinName, coinColor } = route.params;
  return (
    <View style={style.heading}>
      <View style={style.goBack}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Feather name="arrow-left" color={"#000"} size={"25"} />
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
      <View style={style.titleContainer}>
        <View style={style.titleInfo}>
          <ExchangePicker />
        </View>
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
  titleContainer: {
    width: windowWidth / 3,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  titleInfo: {
    width: "85%",
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

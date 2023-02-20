import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import InsetShadow from "react-native-inset-shadow";
import Feather from "react-native-vector-icons/Feather";
import IonIcon from "react-native-vector-icons/Ionicons";

const switchBorderRadius = 6;

export default function Header({ navigation, route }) {
  const [selectedMetric, setSelectedMetric] = useState("finance");
  const { coinInfo } = route.params;

  return (
    <View style={style.heading}>
      <View style={style.relative}>
        <TouchableOpacity
          style={style.goBack}
          onPress={() => navigation.navigate("Home")}
        >
          <Feather name="arrow-left" color={"#000"} size={"25"} />
          <Text>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={style.headerSwitch}>
        <Pressable
          onPress={() => setSelectedMetric("finance")}
          style={[
            style.switchBox,
            {
              backgroundColor: selectedMetric === "finance" ? "#FFF" : null,
            },
            selectedMetric === "finance"
              ? {
                  shadowColor: "#000",
                  shadowOffset: { width: 1.95, height: 0 },
                  shadowOpacity: 0.3,
                  shadowRadius: 2.6,
                  elevation: 3,
                }
              : {},
          ]}
        >
          <IonIcon
            name="bar-chart-outline"
            size="25"
            color={selectedMetric === "finance" ? "#228b22" : "#4f4f4f"}
          />
          {/* <Text style={[style.switchText]}>$</Text> */}
        </Pressable>
        <Pressable
          onPress={() => setSelectedMetric("social")}
          style={[
            style.switchBox,
            {
              backgroundColor: selectedMetric === "social" ? "#FFF" : null,
            },
            selectedMetric === "social"
              ? {
                  shadowColor: "#000",
                  shadowOffset: { width: -1.95, height: 0 },
                  shadowOpacity: 0.3,
                  shadowRadius: 2.6,
                  elevation: 3,
                }
              : {},
          ]}
        >
          <IonIcon
            name="chatbox-ellipses-outline"
            size="25"
            color={selectedMetric === "social" ? "#55acee" : "#4f4f4f"}
          />
          {/* <Text style={[style.switchText]}>@</Text> */}
        </Pressable>
      </View>
      <View style={style.relative}>
        <Text style={style.title}>{coinInfo.name.toUpperCase()} / USD</Text>
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
    paddingVertical: 5,
  },
  relative: {
    position: "relative",
  },
  goBack: {
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
  },
  title: {
    fontWeight: "600",
    fontSize: 15,
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    right: 0,
  },
  headerSwitch: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#BABABA",
    borderRadius: 8,
    borderColor: "#BABABA",
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

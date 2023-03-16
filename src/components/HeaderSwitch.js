import { View, Pressable, StyleSheet } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
const switchBorderRadius = 6;

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
export default function HeaderSwitch() {
  return (
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
  );
}

const style = StyleSheet.create({
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
  headerSwitch: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#CCCCCC",
    borderRadius: 8,
    borderColor: "#CCCCCC",
    borderWidth: 2,
  },
});

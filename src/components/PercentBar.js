import { View, StyleSheet } from "react-native";
import ThemeText from "./ThemeText";
function Bar(props) {
  return (
    <View
      style={[
        styles.percentBar,
        { backgroundColor: props.color, width: `${props.percent}%` },
      ]}
    >
      {Math.round(props.percent) > 0 ? (
        <ThemeText
          style={[styles.percentText, props.left ? { left: 0 } : { right: 0 }]}
        >
          {Math.round(props.percent)}%
        </ThemeText>
      ) : null}
    </View>
  );
}

export default function PercentBar(props) {
  return (
    <View style={[styles.percentWrapper, { width: props.width }]}>
      <Bar color="#E10600" percent={props.negativePercent} left />
      <Bar color="#008000" percent={props.positivePercent} />
    </View>
  );
}

const styles = StyleSheet.create({
  percentWrapper: {
    position: "relative",
    height: 8,
    display: "flex",
    flexDirection: "row",
    top: "15%",
  },
  percentBar: {
    borderRadius: 10,
    height: "100%",
    position: "relative",
    marginHorizontal: 1,
  },
  percentText: {
    position: "absolute",
    bottom: 8,
    fontWeight: "600",
  },
});

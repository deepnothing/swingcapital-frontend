import { Pressable, StyleSheet } from "react-native";
import { colors } from "../styles/colors";

export default function BigButton(props) {
  return (
    <Pressable
      disabled={props.disabled}
      onPress={props.onPress}
      style={[styles.button, { width: props.width ? props.width : "95%" }]}
    >
      {props.children}
    </Pressable>
  );
}
const styles = StyleSheet.create({
  button: {
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: colors.swing,
    shadowColor: "rgba(60, 64, 67, 0.3)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
});

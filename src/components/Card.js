import { useContext } from "react";
import { ThemeContext } from "../hooks/ThemeContext";
import { View } from "react-native";
import { colors } from "../styles/colors";
export default function Card(props) {
  const { theme } = useContext(ThemeContext);
  return (
    <View
      onPress={props.onPress}
      style={[
        {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          height: 103,
          borderRadius: 10,
          padding: 10,
          marginVertical: 7,
          backgroundColor:
            theme.mode === "light" ? colors.light.base : colors.dark.high,
        },
        props.style,
      ]}
    >
      {props.children}
    </View>
  );
}

import { useContext } from "react";
import { View } from "react-native";
import { ThemeContext } from "../hooks/ThemeContext";

export default function ScreenContainer(props) {
  const { theme } = useContext(ThemeContext);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.mode === "light" ? "#FFF" : "#0e1321",
      }}
    >
      {props.children}
    </View>
  );
}

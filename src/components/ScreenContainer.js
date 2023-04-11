import { useContext } from "react";
import { View } from "react-native";
import { ThemeContext } from "../hooks/ThemeContext";
import { colors } from "../styles/colors";

export default function ScreenContainer(props) {
  const { theme } = useContext(ThemeContext);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor:
          theme.mode === "light" ? colors.light.medium : colors.dark.medium,
      }}
    >
      {props.children}
    </View>
  );
}

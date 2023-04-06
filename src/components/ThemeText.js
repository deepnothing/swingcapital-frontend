import { useContext } from "react";
import { ThemeContext } from "../hooks/ThemeContext";
import { Text } from "react-native";

export default function ThemeText(props) {
  const { theme } = useContext(ThemeContext);
  return (
    <Text
      {...props}
      style={[{ color: theme.mode === "light" ? "#000" : "#fff" }, props.style]}
    >
      {props.children}
    </Text>
  );
}

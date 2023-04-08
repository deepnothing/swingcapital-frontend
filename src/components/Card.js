import { useContext } from "react";
import { ThemeContext } from "../hooks/ThemeContext";
import { View } from "react-native";
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
          height: 90,
          borderRadius: 10,
          padding: 7,
          marginVertical: 10,
          borderColor: "gray",
          shadowColor: "rgba(60, 64, 67, 0.3)",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 3,
          backgroundColor: theme.mode === "light" ? "#FFFF" : "#161c29",
        },
        props.style,
      ]}
    >
      {props.children}
    </View>
  );
}

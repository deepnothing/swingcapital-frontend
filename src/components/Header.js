import { useContext, useEffect } from "react";
import { SafeAreaView, View, Dimensions, StatusBar } from "react-native";
import { ThemeContext } from "../hooks/ThemeContext";
import { colors } from "../styles/colors";

export default function Header(props) {
  const { theme } = useContext(ThemeContext);

  return (
    <SafeAreaView
      {...props}
      style={[
        {
          backgroundColor:
            theme.mode === "light" ? colors.swing : colors.dark.base,
          shadowColor: "rgba(0, 0, 0, 0.45)",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 1,
          shadowRadius: 5,
          elevation: 10,
          zIndex: 1,
          height: Dimensions.get("window").height / 9,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: props.justifyContent,
        },
        props.style,
      ]}
    >
      <StatusBar
        backgroundColor={theme.mode == "light" ? "#fff" : "#000"}
        barStyle={theme.mode == "light" ? "dark-content" : "light-content"}
      />
      {props.children}
    </SafeAreaView>
  );
}

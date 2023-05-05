import { useContext } from "react";
import { SafeAreaView, Dimensions, StatusBar, Platform } from "react-native";
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
          shadowColor: `rgba(0, 0, 0, ${Platform.OS === "ios" ? "0.45" : "1"})`,
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 1,
          shadowRadius: 5,
          elevation: 10,
          zIndex: 1,
          height:
            Platform.OS === "android"
              ? Dimensions.get("window").height / 13
              : Platform.isPad
              ? Dimensions.get("window").height / 15
              : Dimensions.get("window").height / 9,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: props.justifyContent,
        },
        props.style,
      ]}
    >
      <StatusBar
        backgroundColor={
          theme.mode == "light" ? colors.swing : colors.dark.base
        }
        barStyle={theme.mode == "light" ? "dark-content" : "light-content"}
      />
      {props.children}
    </SafeAreaView>
  );
}

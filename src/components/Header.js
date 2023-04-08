import { useContext } from "react";
import { SafeAreaView, View, Dimensions } from "react-native";
import { ThemeContext } from "../hooks/ThemeContext";

export default function Header(props) {
  const { theme } = useContext(ThemeContext);
  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.mode === "light" ? "#ffc72c" : "#000",
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
      }}
    >
      {props.children}
    </SafeAreaView>
  );
}

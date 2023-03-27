import { SafeAreaView, View, Dimensions } from "react-native";

export default function Header(props) {
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#ffc72c",
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

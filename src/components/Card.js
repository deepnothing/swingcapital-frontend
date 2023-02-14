import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
export default function Card(props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
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
        backgroundColor: "#FFFF",
      }}
    >
      {props.children}
    </TouchableOpacity>
  );
}

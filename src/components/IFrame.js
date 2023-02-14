import { View, StyleSheet, Text } from "react-native";
import { WebView } from "react-native-webview";
import Feather from "react-native-vector-icons/Feather";

export default function IFrame({ url }) {
  const urL = "https://gizmodo.com/genesis-crypto-bankruptcy-1850011318";
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Feather
          name="globe"
          color={"#000"}
          size={"20"}
          style={{ position: "absolute", left: 10 }}
        />
        <Text style={styles.siteName}>sitename</Text>
        <Text style={styles.close}>Exit</Text>
      </View>
      <WebView
        source={{
          uri: urL,
        }}
        originWhitelist={["*"]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "75%",
    zIndex: 10,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#FFF",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: "relative",
  },
  siteName: {
    fontSize: 15,
    fontWeight: "700",
  },
  close: {
    color: "#ffc72c",
    fontWeight: "700",
    fontSize: 18,
    marginRight: 15,
    position: "absolute",
    right: 0,
  },
});

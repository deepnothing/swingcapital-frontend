import { View, StyleSheet, Text, Pressable } from "react-native";
import { WebView } from "react-native-webview";
import Feather from "react-native-vector-icons/Feather";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function IFrame({ url, setIframeVisible }) {
  const getDomainName = (fullUrl) => {
    return fullUrl.replace(/^(https?:\/\/)?(www\.)?/i, '').split('/')[0];
};
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Feather
          name="globe"
          color={"#000"}
          size={"20"}
          style={{ position: "absolute", left: 10 }}
        />
        <Text style={styles.siteName}>{getDomainName(url)}</Text>
        <Pressable
          onPress={() => setIframeVisible(false)}
          style={{ position: "absolute", right: 0, marginRight: 15 }}
        >
          <Text style={styles.close}>Exit</Text>
        </Pressable>
      </View>
      <WebView
        source={{
          uri: url,
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
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 22,
    },
    shadowOpacity: 1,
    shadowRadius: 70,
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
  },
});

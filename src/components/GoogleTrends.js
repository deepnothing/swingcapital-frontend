import { View, StyleSheet, Text, ActivityIndicator,Dimensions } from "react-native";
import SocialChart from "./SocialChart/SocialChart";

export default function GoogleTrends(props) {
  const { data, routeColor } = props;
  const apx = (size = 0) => {
    let width = Dimensions.get("window").width;
    return (width / 750) * size;
  };
  return (
    <View style={styles.wrapper}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "flex-start",
          marginVertical: 10,
          paddingHorizontal: 10,
          width: "100%",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "600" }}>
          <Text style={{ color: "#4285F4" }}>G</Text>
          <Text style={{ color: "#DB4437" }}>o</Text>
          <Text style={{ color: "#F4B400" }}>o</Text>
          <Text style={{ color: "#4285F4" }}>g</Text>
          <Text style={{ color: "#0F9D58" }}>l</Text>
          <Text style={{ color: "#DB4437" }}>e</Text> Search Trends
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginVertical: 7,
        }}
      >
        {data.length > 0 ? (
          <SocialChart data={data} routeColor={routeColor} />
        ) : (
          <View style={{ height: apx(300) }}>
            <ActivityIndicator size="small" color={`rgb(${routeColor})`} />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    alignSelf: "center",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#FFF",
    borderRadius: 11,
  },
});

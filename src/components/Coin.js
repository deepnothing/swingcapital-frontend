import { View, Text, Image, StyleSheet } from "react-native";

export default function Coin({ data }) {
  return (
    <View style={styles.coin}>
      <View style={styles.face}>
        <View style={styles.name}>
          <Image
            style={styles.logo}
            source={{
              uri: data.logo,
            }}
          />
          <View style={{ height: 5 }} />
          <Text style={styles.title}>{data.name.toUpperCase()}</Text>
        </View>
        <View>
          <Text style={{ fontSize: 12 }}>${data.currentPrice}</Text>
        </View>
      </View>
      <Text>Chart</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  coin: {
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
  },
  title: {
    fontWeight: "600",
    fontSize: 12,
  },
  name: { display: "flex", flexDirection: "column", alignItems: "center" },
  face: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    height: "100%",
  },
  logo: {
    height: 30,
    width: 30,
  },
});

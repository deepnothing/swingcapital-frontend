import { Button, View, StyleSheet, Pressable, Text } from "react-native";
import { useState } from "react";
import Card from "./Card";

export default function Strategy({ heading, description }) {
  const [isOverlayed, setOverLayed] = useState(true);
  return (
    <Card>
      <View style={styles.header}>
        <Text style={{ fontWeight: "600", fontSize: 15 }}>{heading}</Text>
        <Text style={{ fontWeight: "500", fontSize: 12 }}>{description}</Text>
      </View>
      <View style={styles.buttonWrapper}>
        <Pressable
          style={[
            styles.buttonStyle,
            isOverlayed ? { backgroundColor: "#ffc72c" } : null,
          ]}
          onPress={() => setOverLayed(!isOverlayed)}
        >
          <Text style={{ fontSize: 12 }}>Overlay</Text>
        </Pressable>
        <Pressable style={styles.buttonStyle}>
          <Text style={{ fontSize: 12 }}>Execute</Text>
        </Pressable>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  buttonStyle: {
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
    borderColor: "#ffc72c",
    borderWidth: 3,
  },
  header: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    height: "100%",
  },
});

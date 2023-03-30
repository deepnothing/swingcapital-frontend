import React from "react";
import {
  Text,
  Pressable,
  Image,
  View,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import BigButton from "../../components/BigButton";
import { rotate } from "@shopify/react-native-skia";

function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View />
      <View style={styles.mainContent}>
        <Image
          source={require("../../../assets/logo-500.png")}
          style={{ width: 70, height: 70, alignSelf: "center" }}
        />

        <BigButton onPress={() => navigation.navigate("Sign In")}>
          <Text style={styles.registerText}>Sign In</Text>
        </BigButton>
        <Pressable
          style={styles.create}
          onPress={() => navigation.navigate("Sign Up")}
        >
          <Text style={styles.createText}>Sign Up</Text>
        </Pressable>
      </View>
      <View />
    </SafeAreaView>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  registerText: {
    color: "#FFFF",
    fontSize: 20,
    fontWeight: "600",
  },
  createText: {
    color: "#ffc72c",
    fontSize: 15,
    fontWeight: "600",
  },
  create: {
    width: "95%",
    height: 55,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: "#343434",
    shadowColor: "rgba(60, 64, 67, 0.3)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
  mainContent: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: 300,
  },
  container: {
    height: "100%",
    justifyContent: "space-evenly",
    marginHorizontal: 20,
    maxWidth: 500,
  },
});

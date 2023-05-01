import React from "react";
import {
  Text,
  Pressable,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import BigButton from "../../components/BigButton";
import WebView from "react-native-webview";
import { logoHtml } from "./swingLogoView";
import { storeData } from "../../hooks/asyncStorage";
import { colors } from "../../styles/colors";

function WelcomeScreen({ navigation, setGuestUser }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.skip}>
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => {
            storeData("guest", true);
            setGuestUser(true);
          }}
        >
          <Text style={{ fontSize: 19, fontWeight: "600" }}>Skip </Text>
          <Feather
            name="arrow-right"
            color={colors.swing}
            style={{ fontSize: 28 }}
          />
        </TouchableOpacity>
      </View>
      <View />
      <View style={styles.mainContent}>
        <View style={{ width: "100%", height: 80 }}>
          <WebView
            source={{
              html: logoHtml,
            }}
          />
        </View>
        <BigButton onPress={() => navigation.navigate("Sign In")}>
          <Text style={styles.registerText}>Sign In</Text>
        </BigButton>
        <Pressable
          style={styles.create}
          onPress={() => navigation.navigate("Sign Up")}
        >
          <Text style={styles.createText}>Sign Up</Text>
        </Pressable>
        <View></View>
      </View>
      <View />
    </SafeAreaView>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  registerText: {
    color: colors.light.base,
    fontSize: 20,
    fontWeight: "600",
  },
  createText: {
    color: colors.swing,
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
  skip: {
    position: "absolute",
    right: 0,
    margin: 20,
    top: 50,
  },
  skipButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

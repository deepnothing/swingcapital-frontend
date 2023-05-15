import React from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Alert,
  Platform,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import BigButton from "../../components/BigButton";
import WebView from "react-native-webview";
import { html } from "./swingWebView";
import { colors } from "../../styles/colors";
import { storeData } from "../../hooks/asyncStorage";

const auth = getAuth();

function SignInScreen({ navigation, setGuestUser }) {
  const [value, setValue] = React.useState({
    email: "",
    password: "",
    error: "",
  });

  async function signIn() {
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Email and password are mandatory.",
      });

      Alert.alert("Error", "Email and password are mandatory.", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);

      return;
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
    } catch (error) {
      console.log(error);

      Alert.alert("Error", error.message.replace("Firebase:", ""), [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);

      setValue({
        ...value,
        error: error.message,
      });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View />
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
      <View style={styles.mainContent}>
        <View style={{ width: "100%", height: Platform.isPad ? 220 : 70 }}>
          <WebView
            source={{
              html: html("Sign In"),
            }}
          />
        </View>
        <View style={styles.input}>
          <Feather name="mail" color={"#C3C3C3"} style={{ fontSize: 19 }} />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#343434"
            value={value.email}
            style={{ padding: 5, width: "100%", height: "100%" }}
            onChangeText={(text) => setValue({ ...value, email: text })}
          />
        </View>
        <View style={styles.input}>
          <Feather name="lock" color={"#C3C3C3"} style={{ fontSize: 19 }} />
          <TextInput
            style={{ padding: 5, width: "100%", height: "100%" }}
            placeholder="Password"
            placeholderTextColor="#343434"
            onChangeText={(text) => setValue({ ...value, password: text })}
            secureTextEntry={true}
          />
        </View>

        <BigButton onPress={signIn} width="100%">
          <Feather
            name="log-in"
            color={colors.light.base}
            style={{ fontSize: 25 }}
          />
        </BigButton>
      </View>
      <Text style={{ alignSelf: "center" }}>
        Don't Have an account?{" "}
        <Text
          style={{ color: colors.swing }}
          onPress={() => navigation.navigate("Sign Up")}
        >
          Sign Up
        </Text>
      </Text>
    </SafeAreaView>
  );
}

export default SignInScreen;

const styles = StyleSheet.create({
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: "#fff",
    color: "#424242",
  },
  buttonText: {
    color: "#FFFF",
    fontSize: 20,
    fontWeight: "600",
  },
  input: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    height: 60,
    width: "100%",
    borderRadius: 7,
    backgroundColor: "#F5F5F5",
  },
  mainContent: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: Platform.isPad ? 500 : 400,
  },
  container: {
    height: "100%",
    justifyContent: "space-evenly",
    marginHorizontal: 20,
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

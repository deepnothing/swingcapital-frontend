import React from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {
  Pressable,
  StyleSheet,
  TextInput,
  Text,
  View,
  SafeAreaView,
} from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../config/firebase";
import Feather from "react-native-vector-icons/Feather";
import { set, ref } from "firebase/database";
import BigButton from "../../components/BigButton";
import WebView from "react-native-webview";
import { html } from "./swingWebView";

const auth = getAuth();

function SignUpScreen({ navigation }) {
  const [value, setValue] = React.useState({
    email: "",
    password: "",
    error: "",
  });

  async function signUp() {
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Email and password are mandatory.",
      });
      return;
    }

    try {
      const createUser = await createUserWithEmailAndPassword(
        auth,
        value.email,
        value.password
      );
      // set user data in database
      set(ref(db, "users/" + createUser.user.uid), {
        email: createUser.user.email,
        registered: false,
      });
      // navigate to home screen after creation
      navigation.navigate("Sign In");
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View />
      <View style={styles.mainContent}>
        <View style={{ width: "100%", height: 70 }}>
          <WebView
            source={{
              html: html("Sign Up"),
            }}
          />
        </View>
        <View style={styles.input}>
          <Feather name="mail" color={"#C3C3C3"} size={"19"} />
          <TextInput
            placeholder="Email"
            value={value.email}
            style={{ padding: 5, width: "100%", height: "100%" }}
            onChangeText={(text) => setValue({ ...value, email: text })}
          />
        </View>
        <View style={styles.input}>
          <Feather name="lock" color={"#C3C3C3"} size={"19"} />
          <TextInput
            style={{ padding: 5, width: "100%", height: "100%" }}
            placeholder="Password"
            onChangeText={(text) => setValue({ ...value, password: text })}
            secureTextEntry={true}
          />
        </View>

        <BigButton onPress={signUp} width="100%">
          <Feather name="user-plus" color={"#FFF"} size={"25"} />
        </BigButton>
      </View>
      <Text className="text-center text-black font-main text-base">
        Have an account?{" "}
        <Text
          className="text-[#ffc72c]"
          onPress={() => navigation.navigate("Sign In")}
        >
          Sign In
        </Text>
      </Text>
    </SafeAreaView>
  );
}

export default SignUpScreen;

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
    height: 400,
  },
  container: {
    height: "100%",
    justifyContent: "space-evenly",
    marginHorizontal: 20,
    maxWidth:500
  },
});

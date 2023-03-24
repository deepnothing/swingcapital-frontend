import React from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import {
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  Text,
  View,
  Alert,
} from "react-native";
//import Icon from 'react-native-vector-icons/FontAwesome';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import BigButton from "../../components/BigButton";

const auth = getAuth();

function SignInScreen({ navigation }) {
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
    <View className="w-full h-full">
      <View className="mx-4 h-5/6 flex justify-center align-center space-y-6">
        {/* <Image
          source={logo}
          style={{ width: 100, height: 100, alignSelf: "center" }}
        /> */}
        <Text className="block  font-title text-2xl font-bold text-center text-black">
          Sign In
        </Text>

        <View className="space-y-6">
          <View className="mt-1 space-y-4">
            <View className="flex-1 font-main flex-row justify-center align-center rounded-xl px-1 py-1 bg-gray-100">
              <Icon style={styles.icon} name="email" size={18} color="gray" />
              <TextInput
                placeholder="Email"
                value={value.email}
                className="flex-1 pt-2.5 pr-2.5 pb-2.5 pl-0"
                onChangeText={(text) => setValue({ ...value, email: text })}
              />
            </View>

            <View className="flex-1 flex-row justify-center align-center rounded-xl px-1 py-1 bg-gray-100">
              <Icon style={styles.icon} name="lock" size={18} color="gray" />
              <TextInput
                placeholder="Password"
                className="flex-1 pt-2.5 pr-2.5 pb-2.5 pl-0"
                onChangeText={(text) => setValue({ ...value, password: text })}
                secureTextEntry={true}
              />
            </View>
          </View>
          <BigButton onPress={signIn}>
            <Text style={styles.buttonText}>Sign In</Text>
          </BigButton>
        </View>
        <Text className="text-center text-black font-main text-base">
          Don't Have an account?{" "}
          <Text
            className="text-[#ffc72c]"
            onPress={() => navigation.navigate("Sign Up")}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
}

export default SignInScreen;

const styles = StyleSheet.create({
  icon: {
    padding: 10,
  },
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
});

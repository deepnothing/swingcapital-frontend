import React from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, StyleSheet, TextInput, Text, View } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../config/firebase";
import { set, ref } from "firebase/database";
import BigButton from "../../components/BigButton";

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
    <View className="w-full h-full">
      <View className="mx-4 h-5/6 flex justify-center align-center space-y-6">
        {/* <Image source={logo} style={{ width: 100, height: 100, alignSelf: "center" }} /> */}
        <Text className="block  font-title text-2xl font-bold text-center text-black">
          Sign Up
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
          <BigButton onPress={signUp}>
            <Text style={styles.buttonText}>
              Sign Up
            </Text>
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
      </View>
    </View>
  );
}

export default SignUpScreen;

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
  buttonText:{
    color: "#FFFF",
    fontSize: 20,
    fontWeight: "600",
  }
});

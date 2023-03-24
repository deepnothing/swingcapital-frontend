import React from "react";
import { Text, Pressable, Image, View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import BigButton from "../../components/BigButton";

function WelcomeScreen({ navigation }) {
  return (
    <View className="w-full h-full">
      <View style={{ flex: 1, borderRadius: 20 }}>
        <View className="mx-4 h-full flex justify-center align-center space-y-6">
          <View>
            <Image
              source={require("../../../assets/logo-500.png")}
              style={{ width: 70, height: 70, alignSelf: "center" }}
            />
          </View>
          <View>
            <BigButton onPress={() => navigation.navigate("Sign In")}>
              <Text style={styles.registerText}>Sign In</Text>
            </BigButton>
            <Pressable
              style={styles.create}
              onPress={() => navigation.navigate("Sign Up")}
            >
              <Text style={styles.createText}>Create an account</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
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
    height: 45,
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
});

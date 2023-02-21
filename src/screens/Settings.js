import React from "react";
import { Modal, TouchableOpacity, Text, Pressable, View,SafeAreaView } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useAuth } from "../hooks/useAuth";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

function Settings() {
  const { user } = useAuth();

  return (
    <SafeAreaView>
      <Pressable onPress={() => signOut(auth)}>
        <View className="flex flex-row m-4">
          <Feather name="log-out" color="black" size={"24"} />
          <Text className="text-black text-xl">&nbsp;Logout {user?.email}</Text>
        </View>
      </Pressable>
    </SafeAreaView>
  );
}

export default Settings;

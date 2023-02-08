import React from "react";
import { Modal, TouchableOpacity, Text, Pressable, View } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useAuth } from "../hooks/useAuth";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();


function Settings() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const { user } = useAuth();

  return (
    <View>
      <Pressable  onPress={() => setModalVisible(true)} style={{display:'flex',flexDirection:'column',alignItems:'center',marginTop:10}}>
        <Feather name="settings" color="#343434" size={"24"} />
        <Text style={{fontSize:12,color:"#343434"}}>Settings</Text>
      </Pressable>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableOpacity
          onPress={() => setModalVisible(!modalVisible)}
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0)" }}
        >
          <View className="h-[40%] mt-auto rounded-t-3xl ">
            <View
              style={{ flex: 1, borderRadius: 20,backgroundColor:"#ffc72c" }}
            >
              <Pressable onPress={() => signOut(auth)}>
                <View className="flex flex-row m-4">
                  <Feather
                    name="log-out"
                    color="black"
                    size={"24"}
                  />
                  <Text className="text-black text-xl">&nbsp;Logout {user?.email}</Text>
                </View>
              </Pressable>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

export default Settings;

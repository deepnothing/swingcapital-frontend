import { useState } from "react";
import {
  Modal,
  TouchableOpacity,
  Text,
  Pressable,
  View,
  SafeAreaView,
  StyleSheet,
  Switch,
  Alert,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import IonIcon from "react-native-vector-icons/Ionicons";
import { useAuth } from "../hooks/useAuth";
import { getAuth, signOut, deleteUser } from "firebase/auth";
import Header from "../components/Header";
import SwingCapitalText from "../components/SwingCapital";
import ExchangePicker from "../components/ExchangePicker";

const auth = getAuth();

function Settings() {
  const { user } = useAuth();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const deleteAccount = (user) => {
    Alert.alert(
      "",
      "You are about to delete your account, this action cannot be undone",
      [
        {
          text: "Cancel",
          style: "destructive",
        },
        {
          text: "Delete",
          onPress: () => deleteUser(user),
          style: "destructive",
        },
      ]
    );
    // deleteUser(user)
  };
  return (
    <View>
      <Header>{/* <SwingCapitalText text="Settings" /> */}</Header>
      <View style={styles.options}>
        <View style={styles.row}>
          <TouchableOpacity>
            <Feather
              name="user"
              color="black"
              size={"25"}
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
          <Text style={{ fontWeight: "600" }}>{user?.email}</Text>
        </View>
        <View style={styles.row}>
          <Feather
            name="sun"
            color="black"
            size={"25"}
            style={{ marginRight: 10 }}
          />
          <Text>Theme </Text>
          <Switch
            style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <TouchableOpacity style={styles.row} onPress={() => signOut(auth)}>
          <Feather
            name="log-out"
            color="black"
            size={"25"}
            style={{ marginRight: 10 }}
          />
          <Text>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => deleteAccount(auth)}
        >
          <Feather
            name="x-octagon"
            color="red"
            size={"25"}
            style={{ marginRight: 10 }}
          />

          <Text>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Settings;

const styles = StyleSheet.create({
  options: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
});

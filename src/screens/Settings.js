import { useEffect, useState, useContext } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from "../hooks/ThemeContext";

const auth = getAuth();

function Settings({ route }) {
  const { user } = useAuth();
  const { theme, updateTheme } = useContext(ThemeContext);
  const [isActive, setIsActive] = useState(theme.mode === "light");
  const toggleSwitch = () => {
    updateTheme();
    setIsActive((prevstate) => !prevstate);
  };
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
            name={theme.mode === "light" ? "sun" : "moon"}
            color="black"
            size={"25"}
            style={{ marginRight: 10 }}
          />
          <Text>Theme </Text>
          <Switch
            style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isActive ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isActive ? true : false}
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

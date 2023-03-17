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
import { useAuth } from "../hooks/useAuth";
import { getAuth, signOut, deleteUser } from "firebase/auth";
import Header from "../components/Header";
import { ThemeContext } from "../hooks/ThemeContext";
import { ref, remove } from "firebase/database";
import { db } from "../config/firebase";

const auth = getAuth();

function Settings() {
  const { user } = useAuth();
  const { theme, updateTheme } = useContext(ThemeContext);
  const [isActive, setIsActive] = useState(theme.mode === "light");
  const toggleSwitch = () => {
    updateTheme();
    setIsActive((prevstate) => !prevstate);
  };

  const deleteAccount = (user) => {
    Alert.alert(
      "Warning",
      "You are about to delete your account, this action cannot be undone",
      [
        {
          text: "Cancel",
          style: "destructive",
        },
        {
          text: "Delete",
          onPress: () => {
            {
              const userLocationInDB = ref(db, "users/" + auth.currentUser.uid);
              remove(userLocationInDB)
                .then(() => {
                  console.log("User successfully removed from the database");
                })
                .catch((error) => {
                  console.error("Error removing user: ", error);
                });

              // delete user from auth db
              deleteUser(auth.currentUser)
                .then(() => {
                  console.log("user deleted from auth");
                })
                .catch((error) => {
                  Alert.alert(
                    "Error",
                    "A recent sign in is required, log out and log back in to delete your account",
                    [
                      {
                        text: "OK",
                        style: "cancel",
                      },
                    ]
                  );
                });
            }
          },
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
        <TouchableOpacity style={styles.row} onPress={() => deleteAccount()}>
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

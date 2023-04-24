import { useState, useContext } from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Switch,
  Alert,
  Image,
} from "react-native";
import Constants from "expo-constants";
import Feather from "react-native-vector-icons/Feather";
import { useAuth } from "../hooks/useAuth";
import { getAuth, signOut, deleteUser } from "firebase/auth";
import Header from "../components/Header";
import { ThemeContext } from "../hooks/ThemeContext";
import { ref, remove } from "firebase/database";
import { db } from "../config/firebase";
import ScreenContainer from "../components/ScreenContainer";
import ThemeText from "../components/ThemeText";
import { colors } from "../styles/colors";

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
    <ScreenContainer>
      <Header justifyContent="center">
        <Image
          style={{
            tintColor: theme.mode === "light" ? '#1b1b1b' : colors.swing,
            marginLeft: 15,
            width: 30,
            aspectRatio: 1 / 1,
          }}
          source={require("../../assets/logo-500.png")}
        />
      </Header>
      <View style={styles.options}>
        <View style={styles.row}>
          <TouchableOpacity>
            <Feather
              name="user"
              color={theme.mode === "light" ? "#000" : "#FFF"}
              size={"25"}
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
          <ThemeText style={{ fontWeight: "600" }}>
            {user ? user?.email : "Guest User"}
          </ThemeText>
        </View>
        <View style={styles.row}>
          <Feather
            name={theme.mode === "light" ? "sun" : "moon"}
            color={theme.mode === "light" ? "#000" : "#FFF"}
            size={"25"}
            style={{ marginRight: 10 }}
          />
          <ThemeText>Theme </ThemeText>
          <Switch
            style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isActive ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isActive ? true : false}
          />
        </View>
        {user ? (
          <>
            <TouchableOpacity style={styles.row} onPress={() => signOut(auth)}>
              <Feather
                name="log-out"
                color={theme.mode === "light" ? "#000" : "#FFF"}
                size={"25"}
                style={{ marginRight: 10 }}
              />
              <ThemeText>Logout</ThemeText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.row}
              onPress={() => deleteAccount()}
            >
              <Feather
                name="x-octagon"
                color="red"
                size={"25"}
                style={{ marginRight: 10 }}
              />

              <ThemeText>Delete Account</ThemeText>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={styles.row}
              onPress={() => route.params.setGuestUser(false)}
            >
              <Feather
                name="log-in"
                color={theme.mode === "light" ? "#000" : "#FFF"}
                size={"25"}
                style={{ marginRight: 10 }}
              />
              <ThemeText>Sign In</ThemeText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.row}
              onPress={() => route.params.setGuestUser(false)}
            >
              <Feather
                name="user-plus"
                color={theme.mode === "light" ? "#000" : "#FFF"}
                size={"25"}
                style={{ marginRight: 10 }}
              />
              <ThemeText>Sign Up</ThemeText>
            </TouchableOpacity>
          </>
        )}
        <ThemeText style={{ marginTop: 20, alignSelf: "center" }}>
          SwingCapital {Constants.manifest.version}
        </ThemeText>
      </View>
    </ScreenContainer>
  );
}

export default Settings;

const styles = StyleSheet.create({
  options: {
    paddingVertical: 30,
    paddingHorizontal: 15,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
});

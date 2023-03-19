import React, { useEffect, useState } from "react";
import {
  Text,
  Pressable,
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import * as d3 from "d3";
import Header from "../components/Header";
import SwingCapitalText from "../components/SwingCapital";
import { db } from "../config/firebase";
import { ref, onValue, update } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useAuth } from "../hooks/useAuth";

const screenWidth = Dimensions.get("window").width;
function BotScreen({ route }) {
  const [isRegistered, setRegistered] = useState();
  const [isRegistering, setIsRegistering] = useState(false);
  useEffect(() => {
    const userRegistered = ref(db, `users/${route.params.uid}`);
    onValue(userRegistered, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      setRegistered(data.registered);
    });
  }, []);

  const registerForBot = () => {
    // set user data in database
    setIsRegistering(true);
    update(ref(db, `users/${route.params.uid}`), {
      registered: true,
    })
      .then(() => {
        // registered successfully!
        setIsRegistering(false);
        setRegistered(true);
      })
      .catch((error) => {
        // The write failed...
      });
  };

  return (
    <View>
      <Header>{/* <SwingCapitalText text="Bots" /> */}</Header>
      <TouchableOpacity
        disabled={isRegistered || isRegistered === undefined}
        style={style.register}
        onPress={registerForBot}
      >
        <View style={style.activityWrapper}>
          <Text style={style.registerText}>
            {isRegistered === undefined
              ? "Loading"
              : isRegistered
              ? "Registered"
              : "Register"}
          </Text>
          {isRegistering ||
            (isRegistered === undefined && (
              <ActivityIndicator color={"#FFF"} style={style.indicator} />
            ))}
          {isRegistered && (
            <Feather
              name={"check-square"}
              color={"#FFF"}
              size={"18"}
              style={style.indicator}
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  register: {
    width: "95%",
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 5,
    backgroundColor: "#FFC72C",
    shadowColor: "rgba(60, 64, 67, 0.3)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
  registerText: {
    color: "#FFFF",
    fontSize: 20,
    fontWeight: "600",
  },
  activityWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  indicator: {
    position: "absolute",
    right: "-10%",
    top: "10%",
  },
});

export default BotScreen;

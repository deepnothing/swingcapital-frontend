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
  ScrollView,
  Image,
  FlatList,
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
const screenHeight = Dimensions.get("window").height;
function BotScreen({ route }) {
  const [isRegistered, setRegistered] = useState();
  const [isRegistering, setIsRegistering] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  useEffect(() => {
    const userRegistered = ref(db, `users/${route.params.user.uid}`);
    onValue(userRegistered, (snapshot) => {
      const data = snapshot.val();
      setRegistered(data.registered);
    });
  }, []);

  const registerForBot = () => {
    // set user data in database
    setIsRegistering(true);
    update(ref(db, `users/${route.params.user.uid}`), {
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

  const data = ["trade1", "trade2"];

  return (
    <View>
      <Header justifyContent="space-between">
        <Text style={style.botHeaderText}>Win: 50% / Loss: 50%</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            style={{ width: 25, height: 25, borderRadius: 6 }}
            source={require("../../assets/kraken.jpeg")}
          />
          <Text style={style.botHeaderText}>Demo : ETH/USD</Text>
        </View>
      </Header>
      <View
        style={{
          height:
            Dimensions.get("window").height -
            Dimensions.get("window").height / 5.2,
        }}
      >
        <FlatList
          data={data}
          renderItem={({ item }) => <Text>{item}</Text>}
          keyExtractor={(item) => item}
          contentContainerStyle={{ padding: 15, paddingTop: 20 }}
          // onRefresh={onRefresh}
          // refreshing={isRefreshing}
          ListFooterComponent={<View style={{ height: 50 }} />}
        />
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
    marginVertical: 10,
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
  botHeaderText: {
    fontSize: 12,
    fontWeight: "600",
    marginHorizontal: 12,
  },
});

export default BotScreen;

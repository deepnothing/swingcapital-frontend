import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Image,
  FlatList,
  Alert,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Header from "../components/Header";
import BigButton from "../components/BigButton";
import { db } from "../config/firebase";
import { ref, onValue, update } from "firebase/database";
import ScreenContainer from "../components/ScreenContainer";
import ThemeText from "../components/ThemeText";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
function BotScreen({ route }) {
  const [isRegistered, setRegistered] = useState();
  const [isRegistering, setIsRegistering] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  useEffect(() => {
    if (route.params.user) {
      const userRegistered = ref(db, `users/${route.params.user.uid}`);
      onValue(userRegistered, (snapshot) => {
        const data = snapshot.val();
        setRegistered(data.registered);
      });
    } else {
      setRegistered(false);
    }
  }, []);

  const registerForBot = () => {
    if (route.params.user) {
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
    } else {
      Alert.alert("", "You must sign in to register", [{ text: "OK" }]);
    }
  };

  const data = ["trade1", "trade2"];

  return (
    <ScreenContainer>
      <Header justifyContent="space-between">
        <ThemeText style={style.botHeaderText}>Win: 50% / Loss: 50%</ThemeText>
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
          <ThemeText style={style.botHeaderText}>Demo : ETH/USD</ThemeText>
        </View>
      </Header>
      <View
        style={{
          height: "87%",
        }}
      >
        <FlatList
          data={data}
          renderItem={({ item }) => <ThemeText>{item}</ThemeText>}
          keyExtractor={(item) => item}
          contentContainerStyle={{
            padding: 15,
            paddingTop: 20,
            height: "100%",
          }}
          // onRefresh={onRefresh}
          // refreshing={isRefreshing}
          ListFooterComponent={<View style={{ height: 50 }} />}
        />
        <BigButton
          disabled={isRegistered || isRegistered === undefined}
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
        </BigButton>
      </View>
    </ScreenContainer>
  );
}

const style = StyleSheet.create({
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

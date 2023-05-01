import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  FlatList,
  Alert,
  Linking,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Header from "../components/Header";
import BigButton from "../components/BigButton";
import { db } from "../config/firebase";
import { ref, onValue, update } from "firebase/database";
import ScreenContainer from "../components/ScreenContainer";
import ThemeText from "../components/ThemeText";
import Card from "../components/Card";
import PercentBar from "../components/PercentBar";
import { TouchableOpacity } from "react-native-gesture-handler";

function BotScreen({ route }) {
  const [isRegistered, setRegistered] = useState();
  const [isRegistering, setIsRegistering] = useState(false);
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

  const data = [
    {
      entryPrice: 27001,
      exitPrice: 27004,
      stopLoss: 27003,
      takeProfit: 27004,
      accountBalanceBefore: 95.01,
      accountbalanceAfter: 95.03,
      fees: 0.001,
      startDate: "April 5 2021",
      endDate: "April 5 2021",
    },
    {
      entryPrice: 27001,
      exitPrice: 27000,
      stopLoss: 27003,
      takeProfit: 27004,
      accountBalanceBefore: 95.01,
      accountbalanceAfter: 95.03,
      fees: 0.001,
      startDate: "April 6 2021",
      endDate: "April 5 2021",
    },
  ];

  const TradeCard = ({ item }) => {
    const color =
      item.exitPrice - item.entryPrice - item.fees > 0 ? "green" : "red";
    return (
      <Card style={{ height: 150 }}>
        <View style={style.column}>
          <ThemeText style={style.tradeText}>
            Position Type: <Text style={{ color: "#A4AEB3" }}>LONG</Text>
          </ThemeText>
          <View style={style.row}>
            <ThemeText style={style.tradeText}>
              Entry Price:{" "}
              <Text style={{ color: "#A4AEB3" }}> ${item.entryPrice} </Text>
            </ThemeText>
            <Text style={{ color: "#A4AEB3" }}>{item.startDate}</Text>
          </View>
          <View style={style.row}>
            <ThemeText style={style.tradeText}>
              Exit Price:{" "}
              <Text style={{ color: "#A4AEB3" }}>${item.entryPrice} </Text>
            </ThemeText>
            <Text style={{ color: "#A4AEB3" }}>{item.startDate}</Text>
          </View>
          <ThemeText style={style.tradeText}>
            Stop loss: <Text style={{ color: "#A4AEB3" }}>$27,001</Text>
          </ThemeText>
          <ThemeText style={style.tradeText}>
            Take Profit:<Text style={{ color: "#A4AEB3" }}>$27,001</Text>
          </ThemeText>
        </View>
        <View style={style.seperator} />
        <View style={style.column}>
          <ThemeText style={{ color: color }}>
            {item.exitPrice - item.entryPrice - item.fees > 0 ? "WIN" : "LOSS"}
          </ThemeText>
          <ThemeText>Fee:{item.fees}</ThemeText>
          <ThemeText>
            P/L:{" "}
            <ThemeText style={{ color: color }}>
              {item.exitPrice - item.entryPrice - item.fees}
            </ThemeText>{" "}
          </ThemeText>
        </View>
      </Card>
    );
  };

  return (
    <ScreenContainer>
      <Header justifyContent="space-evenly">
        <PercentBar negativePercent={20} positivePercent={80} width="45%" />
        <View style={style.headerDemo}>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL("https://pro.kraken.com/app/trade/btc-usd")
            }
          >
            <Image
              style={{ width: 25, height: 25, borderRadius: 6 }}
              source={require("../../assets/kraken.jpeg")}
            />
          </TouchableOpacity>
          <ThemeText style={style.botHeaderText}>BTC - USD</ThemeText>
        </View>
      </Header>
      <View style={{ height: "87%" }}>
        <FlatList
          data={data}
          renderItem={({ item }) => <TradeCard item={item} />}
          contentContainerStyle={style.tradeList}
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
  headerDemo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "45%",
  },
  indicator: {
    position: "absolute",
    right: "-10%",
    top: "10%",
    fontSize: 18,
  },
  botHeaderText: {
    fontSize: 15,
    fontWeight: "600",
    marginHorizontal: 12,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  column: {
    display: "flex",
    flexDirection: "column",
  },
  tradeText: {
    fontSize: 16,
    fontWeight: "500",
    marginVertical: 3,
  },
  seperator: {
    height: "120%",
    backgroundColor: "#EBEBF0",
    width: 2,
  },
  tradeList: {
    padding: 15,
    paddingTop: 20,
    height: "100%",
  },
});

export default BotScreen;

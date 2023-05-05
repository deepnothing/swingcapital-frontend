import React, { useContext, useEffect, useState } from "react";
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
import { numberWithCommas, formatDateString } from "../utilities/utilities";
import { ThemeContext } from "../hooks/ThemeContext";

function BotScreen({ route }) {
  const { theme } = useContext(ThemeContext);
  const [isRegistered, setRegistered] = useState();
  const [isRegistering, setIsRegistering] = useState(false);
  const [trades, setTrades] = useState([]);
  useEffect(() => {
    console.log("focused:Bot.js");
    // get bot trades
    const trades = ref(db, `bots/demobot/trades`);

    onValue(trades, (snapshot) => {
      const data = snapshot.val();
      setTrades(data);
    });

    // check if user is registered for bot
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

  const Label = ({ type }) => {
    return (
      <View
        style={[
          style.label,
          { backgroundColor: type > 0 ? "#CAF1DA" : "#FCD4D6" },
        ]}
      >
        <Text
          style={[style.labelText, { color: type > 0 ? "#00BA51" : "#e84a4f" }]}
        >
          {type > 0 ? "WIN" : "LOSS"}
        </Text>
      </View>
    );
  };

  const TradeCard = ({ item }) => {
    console.log(item.endDate)

    const textColor = theme.mode === "light" ? "#88959c" : "#c0c7ca";
    const color =
      item.accountbalanceAfter - item.accountBalanceBefore > 0
        ? "#00BA51"
        : "#e84a4f";
    return (
      <Card style={{ height: 180 }}>
        <View style={style.column}>
          <View style={style.row}>
            <ThemeText style={style.tradeText}>
              Position Type:{" "}
              <Text
                style={{ color: "#8ca88e", fontSize: 16, fontWeight: "600" }}
              >
                Long
              </Text>
            </ThemeText>
            <Feather
              name="arrow-up-right"
              color={"#8ca88e"}
              style={{ marginLeft: 3, fontSize: 18 }}
            />
          </View>
          <View style={style.row}>
            <ThemeText style={style.tradeText}>
              Entry:{" "}
              <Text style={{ color: textColor }}>
                {" "}
                ${numberWithCommas(item.entryPrice.toFixed(0))}
                {"  -  "}
              </Text>
            </ThemeText>
            <Text style={{ color: textColor }}>
              <Feather
                name="calendar"
                color={textColor}
                style={{ marginLeft: 3, fontSize: 18 }}
              />{" "}
              {formatDateString(item.startDate)}
            </Text>
          </View>
          <View style={style.row}>
            <ThemeText style={style.tradeText}>
              Exit:{" "}
              <Text style={{ color: textColor }}>
                ${numberWithCommas(item.exitPrice.toFixed(0))}
                {"  -  "}
              </Text>
            </ThemeText>
            <Text style={{ color: textColor }}>
              <Feather
                name="calendar"
                color={textColor}
                style={{ marginLeft: 3, fontSize: 18 }}
              />{" "}
              {formatDateString(item.endDate)}
            </Text>
          </View>
          <ThemeText style={style.tradeText}>
            Stop Loss:{" "}
            <Text style={{ color: textColor }}>
              ${numberWithCommas(item.stopLoss.toFixed(0))}
            </Text>
          </ThemeText>
          <ThemeText style={style.tradeText}>
            Take Profit:{" "}
            <Text style={{ color: textColor }}>
              ${numberWithCommas(item.takeProfit.toFixed(0))}
            </Text>
          </ThemeText>

          <ThemeText style={[style.tradeText, { fontSize: 18 }]}>
            P/L:{" "}
            <ThemeText style={{ color: color, fontSize: 15 }}>
              ${item.accountbalanceAfter - item.accountBalanceBefore}
            </ThemeText>{" "}
          </ThemeText>
        </View>

        <Label type={item.accountbalanceAfter - item.accountBalanceBefore} />
      </Card>
    );
  };

  const wins = trades?.filter(
    (item) => item.accountbalanceAfter > item.accountBalanceBefore
  ).length;
  const losses = trades?.filter(
    (item) => item.accountbalanceAfter < item.accountBalanceBefore
  ).length;

  return (
    <ScreenContainer>
      <Header justifyContent="space-evenly">
        <PercentBar
          negativePercent={(losses / trades.length) * 100}
          positivePercent={(wins / trades.length) * 100}
          width="45%"
        />
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
          data={trades}
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
  label: {
    position: "absolute",
    top: 8,
    right: 8,
    borderRadius: 4,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  labelText: {
    fontSize: 15,
    fontWeight: "600",
  },
});

export default BotScreen;

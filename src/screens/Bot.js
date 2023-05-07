import React, { useContext, useEffect, useState } from "react";
import { Svg, Path } from "react-native-svg";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  Linking,
  Platform,
} from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import Feather from "react-native-vector-icons/Feather";
import Header from "../components/Header";
import BigButton from "../components/BigButton";
import { db } from "../config/firebase";
import { ref, onValue, update } from "firebase/database";
import ScreenContainer from "../components/ScreenContainer";
import ThemeText from "../components/ThemeText";
import Card from "../components/Card";
import PercentBar from "../components/PercentBar";
import { numberWithCommas, formatDateString } from "../utilities/utilities";
import { ThemeContext } from "../hooks/ThemeContext";

function BotScreen({ route }) {
  const { theme } = useContext(ThemeContext);
  const [isRegistered, setRegistered] = useState();
  const [isRegistering, setIsRegistering] = useState(false);
  const [trades, setTrades] = useState([]);
  const tabBarHeight = useBottomTabBarHeight();

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
            {/* bundling images not working on builds so this is a workaround att he moment */}
            <View
              style={{
                backgroundColor: "#FFF",
                borderRadius: 5,
                overflow: "hidden",
              }}
            >
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 400.000000 400.000000"
              >
                <Path
                  d="M0 2000V0h4000v4000H0V2000zm2222 1270c143-24 216-48 353-115 147-71 268-159 378-275 150-157 248-320 312-514 64-197 69-245 70-681 0-433 2-421-69-482-91-81-222-61-287 44-24 38-24 41-29 388-5 318-7 353-24 388-49 100-198 129-282 55-69-61-68-55-74-443-5-377-6-380-62-432-28-26-89-53-120-53-73 0-145 45-178 111-19 36-20 60-20 361 0 197-4 338-11 361-14 50-71 113-116 128-82 27-174-6-224-80l-24-36-5-355c-6-402-4-396-89-455-35-24-52-30-99-30-67 0-110 22-156 78l-31 39-5 351c-6 375-8 387-58 441-79 84-226 71-290-27l-27-40-5-356c-5-351-5-357-28-393-65-105-197-126-288-46-71 63-69 49-69 483 1 437 6 487 71 682 107 323 345 607 644 770 247 134 555 183 842 133z"
                  transform="matrix(.1 0 0 -.1 0 400)"
                  fill="#5848d5"
                />
              </Svg>
            </View>
          </TouchableOpacity>
          <ThemeText style={style.botHeaderText}>BTC - USD</ThemeText>
        </View>
      </Header>
      <View style={{ height: "100%" }}>
        <FlatList
          data={trades}
          renderItem={({ item }) => <TradeCard item={item} />}
          contentContainerStyle={style.tradeList}
        />
        <View
          style={{
            position: "absolute",
            width: "100%",
            bottom: tabBarHeight + (Platform.OS === "ios" ? 25 : 5),
          }}
        >
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
    paddingBottom: 200,
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

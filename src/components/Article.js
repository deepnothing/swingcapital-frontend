import Card from "./Card";
import { View, Image, Text, StyleSheet, Dimensions } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import bullImage from "../../assets/bull.png";
import bearImage from "../../assets/bear.png";
import neutralImage from "../../assets/neutral.png";
import ThemeText from "./ThemeText";
import { colors } from "../styles/colors";
import { useContext } from "react";
import { ThemeContext } from "../hooks/ThemeContext";

const innerWidth = Dimensions.get("window").width;

export default function Article({ data, onPress }) {
  const { theme } = useContext(ThemeContext);
  const formatDate = (input) => {
    const date = new Date(input);
    let time = date.toLocaleTimeString();
    time = time.slice(0, -3);
    const options = { month: "long", day: "numeric" };
    let hour = date.getHours();
    let minute = date.getMinutes();
    let ampm = "AM";
    if (hour >= 12) {
      ampm = "PM";
      hour = hour - 12;
    }
    if (hour === 0) {
      hour = 12;
    }
    if (minute < 10) {
      minute = "0" + minute;
    }
    return (
      date.toLocaleDateString("en-US", options) +
      " • " +
      hour +
      ":" +
      minute +
      " " +
      ampm
    );
  };
  const trend = {
    icon:
      data.sentiment > 0
        ? "trending-up"
        : data.sentiment < 0
        ? "trending-down"
        : "activity",
    color:
      data.sentiment > 0
        ? "#34be62"
        : data.sentiment < 0
        ? "#E10600"
        : "#83868B",
    source:
      data.sentiment > 0
        ? bullImage
        : data.sentiment < 0
        ? bearImage
        : neutralImage,
    title:
      data.sentiment > 0
        ? "Bullish"
        : data.sentiment < 0
        ? "Bearish"
        : "Neutral",
  };

  const TrendBar = () => {
    return (
      <View
        style={[
          style.trendBar,
          {
            backgroundColor: data.sentiment === 0 ? "#EDEDF3" : null,
            borderColor: trend.color,
            backgroundColor: theme.mode==='light'?"#EDEDF3":colors.dark.medium,
          },
        ]}
      >
        <View
          style={[
            style.trendBarPercentage,
            {
              right: `${100 - Math.abs(data.sentiment) * 10}%`,
              backgroundColor: trend.color,
            },
          ]}
        />
      </View>
    );
  };

  return (
    <Card onPress={onPress} style={[style.flexColumn, { height: 140 }]}>
      <View style={[style.flexRow, { width: "100%" }]}>
        <Image style={style.newsImage} source={{ uri: data.urlToImage }} />
        <View
          style={[
            style.flexColumn,
            {
              paddingTop: 5,
              paddingLeft: 20,
              paddingRight: 12,
              width: innerWidth / 1.4,
            },
          ]}
        >
          <ThemeText
            style={{ fontSize: 13, fontWeight: "700" }}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {data.title}
          </ThemeText>
          <View style={{ height: 5 }} />
          <ThemeText
            numberOfLines={2}
            ellipsizeMode="tail"
            style={{ fontSize: 10, color: "#777a7d" }}
          >
            {data.description}
          </ThemeText>
        </View>
      </View>
      <View
        style={[
          style.bar,
          {
            backgroundColor:
              theme.mode === "light" ? colors.light.medium : colors.dark.medium,
          },
        ]}
      />
      <View
        style={[
          style.flexRow,
          { width: "100%", justifyContent: "space-evenly" },
        ]}
      >
        <View
          style={[style.flexRow, { width: "50%", justifyContent: "center" }]}
        >
          <Feather
            name="clock"
            color={theme.mode === "light" ? "#83868B" : colors.light.base}
            size={"18"}
            style={{ marginRight: 8 }}
          />

          <ThemeText
            style={{
              color: theme.mode === "light" ? "#83868B" : colors.light.base,
              fontSize: 13,
            }}
          >
            {formatDate(data.publishedAt)}
          </ThemeText>
        </View>
        <View
          style={[
            style.wall,
            {
              backgroundColor:
                theme.mode === "light"
                  ? colors.light.medium
                  : colors.dark.medium,
            },
          ]}
        />
        <View
          style={[
            style.flexRow,
            { width: "50%", justifyContent: "space-evenly" },
          ]}
        >
          <Feather
            name={trend.icon}
            color={trend.color}
            size={"12"}
            style={{
              borderWidth: 1,
              borderRadius: 5,
              padding: 2,
              borderColor: trend.color,
            }}
          />
          <View>
            <Text
              style={{ color: trend.color, fontSize: 12, fontWeight: "500" }}
            >
              {trend.title}
            </Text>
          </View>

          <TrendBar />
        </View>
      </View>
    </Card>
  );
}
const style = StyleSheet.create({
  determinationWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: 65,
    height: "100%",
  },
  imageAndDate: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  newsImage: {
    borderRadius: 10,
    height: 70,
    width: 70,
  },
  articleText: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: 14,
    width: 150,
    height: 75,
  },
  trendBar: {
    height: 6,
    width: "45%",
    borderRadius: 20,
    position: "relative",
    overflow: "hidden",
  },
  trendBarPercentage: {
    zIndex: 0,
    height: 8,
    width: 500,
    borderRadius: 20,
    position: "absolute",
    top: -1,
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column",
  },
  bar: {
    width: "110%",
    height: 3,
    borderRadius: 10,
  },
  wall: {
    width: 2,
    height: "140%",
    borderRadius: 10,
  },
});

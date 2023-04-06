import Card from "./Card";
import { View, Image, Text, StyleSheet } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import bullImage from "../../assets/bull.png";
import bearImage from "../../assets/bear.png";
import neutralImage from "../../assets/neutral.png";
import ThemeText from "./ThemeText";

export default function Article({ data, onPress }) {
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
      "," +
      " " +
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
        ? "#008000"
        : data.sentiment < 0
        ? "#E10600"
        : "#BABABA",
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

  return (
    <Card onPress={onPress}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <View style={style.imageAndDate}>
          <Image
            style={style.newsImage}
            source={
              data.urlToImage
                ? {
                    uri: data.urlToImage,
                  }
                : require("../../assets/newsDefault.png")
            }
          />
          <View style={{ height: 3 }} />
          <ThemeText style={{ fontSize: 10.5, fontWeight: "500" }}>
            {formatDate(data.publishedAt)}
          </ThemeText>
        </View>
        <View style={style.articleText}>
          <ThemeText
            style={{ fontSize: 12, fontWeight: "600" }}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {data.title}
          </ThemeText>
          <ThemeText
            style={{ fontSize: 9, fontWeight: "400" }}
            numberOfLines={4}
            ellipsizeMode="tail"
          >
            {data.description}
          </ThemeText>
        </View>
      </View>
      <View style={style.determinationWrapper}>
        <Feather name={trend.icon} color={trend.color} size={"18"} />
        <Image
          style={{ height: 25, width: 25, tintColor: trend.color }}
          source={trend.source}
        />
        <ThemeText style={{ fontSize: 11, fontWeight: "600", color: trend.color }}>
          {trend.title}
        </ThemeText>
        <View
          style={[
            style.trendBar,
            {
              backgroundColor: data.sentiment === 0 ? "#BABABA" : null,
              borderColor: trend.color,
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
    height: 60,
    width: 110,
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
    height: 7,
    width: 50,
    borderWidth: 1,
    borderRadius: 5,
    position: "relative",
    overflow: "hidden",
  },
  trendBarPercentage: {
    zIndex: 0,
    height: 7,
    width: 500,
    borderRadius: 5,
    position: "absolute",
    top: -1,
  },
});

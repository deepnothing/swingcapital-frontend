import Card from "./Card";
import { View, Image, Text } from "react-native";
import Feather from "react-native-vector-icons/Feather";

export default function Article({ data,onPress }) {
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
  return (
    <Card onPress={onPress}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              borderRadius: 10,
              height: 60,
              width: 110,
            }}
            source={{
              uri: data.urlToImage,
            }}
          />
          <View style={{ height: 3 }} />
          <Text style={{ fontSize: 10.5, fontWeight: "500" }}>
            {formatDate(data.publishedAt)}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginLeft: 14,
            width: 150,
            height: 75,
            // borderWidth: 1,
          }}
        >
          <Text
            style={{ fontSize: 12, fontWeight: "600" }}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {data.title}
          </Text>
          <Text
            style={{ fontSize: 9, fontWeight: "400" }}
            numberOfLines={4}
            ellipsizeMode="tail"
          >
            {data.description}
          </Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent:'space-evenly',
        //   borderWidth:1,
          width:65,
          height:'100%'
        }}
      >
        <Feather name="trending-up" color={"#008000"} size={"18"} />
        <Image style={{height:25,width:25,tintColor:"#008000"}} source={require('../../assets/bull.png')}/>
        <Text style={{ fontSize: 11,fontWeight:'600', color: "#008000" }}>Bullish</Text>

        {/* <Feather name="trending-down" color={"#E10600"} size={"18"} />
        <Image style={{height:25,width:25,tintColor:"#E10600"}} source={require('../../assets/bear.png')}/>
        <Text style={{ fontSize: 11,fontWeight:'600', color: "#E10600" }}>Bearish</Text> */}
      </View>
    </Card>
  );
}

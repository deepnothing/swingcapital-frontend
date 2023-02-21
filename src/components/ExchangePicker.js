import { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  Pressable,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Feather from "react-native-vector-icons/Feather";
import { baseUrl } from "../config/api";

export default function ExchangePicker() {
  const [isOpen, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [fullExchangeList, setFullExchangeList] = useState([]);
  const [exchangeList, setExchangeList] = useState([]);
  const [selectedExchange, setSelectedExchange] = useState();
  const [exchangeColor, setExchangeColor] = useState("0,0,0");

  useEffect(() => {
    //get selected exchange
    fetch(`${baseUrl}/financial/defaultExchange`)
      .then((res) => res.json())
      .then((response) => {
        setSelectedExchange(response);
        fetch(`${baseUrl}/financial/exchanges`)
          .then((dres) => dres.json())
          .then((dresponse) => {
            setExchangeList(dresponse);
            setFullExchangeList(dresponse);
            setExchangeColor(dresponse?.find((o) => o.name === response).color);
          });
      });
  }, []);

  const Item = ({ item }) => {
    return (
      <Pressable
        onPress={() => {
          setSelectedExchange(item.name);
          setExchangeColor(
            fullExchangeList?.find((o) => o.name === item.name).color
          );
        }}
      >
        <Image
          source={{ uri: item.logo }}
          style={{ height: 30, width: "100%" }}
        />
      </Pressable>
    );
  };

  return (
    <View style={style.container}>
      <TouchableOpacity onPress={() => setOpen(!isOpen)} style={style.header}>
        <View style={style.headerSelected}>
          <View
            style={[style.dot, { backgroundColor: `rgb(${exchangeColor})` }]}
          />
          <Text
            numberOfLines={1}
            ellipsizeMode="clip"
            style={style.selectedText}
          >
            &nbsp;{selectedExchange}
          </Text>
        </View>
          <Feather
            name={isOpen ? "chevron-up" : "chevron-down"}
            color={"#000"}
            size={"20"}
          />
      </TouchableOpacity>
      <View style={[style.dropdown, { display: isOpen ? "" : "none" }]}>
        <TextInput
          style={style.input}
          onChangeText={(newText) => {
            setSearchText(newText);
            if (newText === "") {
              setExchangeList(fullExchangeList);
            } else {
            }
            setExchangeList(
              fullExchangeList.filter((item) =>
                item.name.toLowerCase().includes(newText.toLowerCase())
              )
            );
          }}
          value={searchText}
          placeholder="Search..."
          placeholderTextColor="#000"
        />
        <FlatList
          data={exchangeList}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={(item, index) => index}
          contentContainerStyle={{
            borderWidth: 1,
          }}
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    zIndex: 2,
    position: "absolute",
    width: "80%",
    display: "flex",
    justifyContent: "center",
    padding: 5,
    backgroundColor: "#FFF",
    borderRadius: 8,
    shadowColor: "rgba(99, 99, 99, 0.9)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 2,
    shadowOpacity: 1,
    elevation: 2,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerSelected: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    borderRadius: 3,
    justifyContent: "center",
    padding: 2,
    paddingHorizontal: 7,
    paddingVertical: 3,
    maxWidth: "70%",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
  },
  selectedOnTop: {
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
  },
  selectedText: {
    fontSize: 12,
  },
  dropdown: {
    position: "relative",
    width: "100%",
    height: 200,
    backgroundColor: "#FFF",
    overflow: "hidden",
    borderRadius:5
  },
  input: {
    marginVertical:7,
    padding: 3,
    borderRadius: 5,
    fontSize: 12,
    borderWidth:2,
    borderColor:"#ffc72c"
  },
});

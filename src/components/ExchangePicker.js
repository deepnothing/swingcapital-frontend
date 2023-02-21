import { useState } from "react";
import { View, Image, StyleSheet, Text, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Feather from "react-native-vector-icons/Feather";

export default function ExchangePicker() {
  const [isOpen, setOpen] = useState(false);
  const [searchText,setSearchText]=('')
  return (
    <View style={style.container}>
      <View style={style.header}>
        <View style={style.headerSelected}>
          <View style={style.dot} />
          <Text style={style.selectedText}>&nbsp;Kraken</Text>
        </View>
        <TouchableOpacity onPress={() => setOpen(!isOpen)}>
          <Feather
            name={isOpen ? "chevron-up" : "chevron-down"}
            color={"#000"}
            size={"20"}
          />
        </TouchableOpacity>
      </View>
      <View style={[style.dropdown, { display: isOpen ? "" : "none" }]}>
        <TextInput
          style={style.input}
          onChangeText={setSearchText}
          value={searchText}
          placeholder="Search..."
          placeholderTextColor="#000"
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    zIndex: 2,
    position: "relative",
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
    backgroundColor: "red",
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
    position: "absolute",
    width: "110%",
    height: 200,
    borderWidth: 1,
    top: "150%",
    backgroundColor: "#FFF",
  },
  input:{
    margin:5,
    padding:3,
    borderRadius:5,
    fontSize:12
  }
});

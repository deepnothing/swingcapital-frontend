import { TextInput, View, StyleSheet } from "react-native";

export default function SearchBar({style}) {
  return (
    <View style={[styles.container,style]}>
      <TextInput />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    paddingHorizontal: 5,
  },
});

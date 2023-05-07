import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import ThemeText from "../ThemeText";
import { useContext } from "react";
import { ThemeContext } from "../../hooks/ThemeContext";
import { colors } from "../../styles/colors";
import { errorMessage } from "../../config/text";
import Tweet from "./Tweet";

export default function TwitterFeed({ data, error }) {
  const { theme } = useContext(ThemeContext);
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            theme.mode === "light" ? "rgb(249,249,250)" : colors.dark.superhigh,
        },
      ]}
    >
      {data ? (
        <ScrollView nestedScrollEnabled>
          {data.data.map((i, index) => {
            return (
              <Tweet
                key={index}
                item={i}
                authorInfo={data.includes.users[index]}
              />
            );
          })}
        </ScrollView>
      ) : error ? (
        <ThemeText>{errorMessage}</ThemeText>
      ) : (
        <ActivityIndicator color="#1DA1F2" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position:'relative',
    width: "100%",
    height: 170,
    marginTop: 10,
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

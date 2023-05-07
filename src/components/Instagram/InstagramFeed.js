import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import ThemeText from "../ThemeText";
import { useContext } from "react";
import { ThemeContext } from "../../hooks/ThemeContext";
import { colors } from "../../styles/colors";
import { errorMessage } from "../../config/text";
import InstagramPost from "./InstagramPost";

export default function InstagramFeed({ data, error }) {
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
          {data.topPosts.map((i, index) => {
            return <InstagramPost key={index} item={i} />;
          })}
        </ScrollView>
      ) : error ? (
        <ThemeText>{errorMessage}</ThemeText>
      ) : (
        <ActivityIndicator color="#C13584" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 170,
    marginTop: 10,
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

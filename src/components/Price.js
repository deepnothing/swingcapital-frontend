import { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ThemeContext } from "../hooks/ThemeContext";
import { colors } from "../styles/colors";
import SocialChart from "./SocialChart/SocialChart";

export default function Price({ data, color }) {
  const { theme } = useContext(ThemeContext);

//   const [formattedArr, setFormattedArr] = useState(() => {
//     const tempArr = [];
//     for (let i = 0; i < data.length; i++) {
//       tempArr.push({
//         time: data[i][0],
//         value: data[i][1],
//       });
//     }
//     return tempArr;
//   });
  //   console.log(fo, "data");
  return (
    <View
      style={[
        styles.wrapper,
        {
          backgroundColor:
            theme.mode === "light" ? colors.light.base : colors.dark.high,
        },
      ]}
    >
      <Text>hello</Text>
      {/* <View style={styles.chartContainer}>
        <SocialChart
          routeColor={color}
          data={formattedArr}
          //   gridMin={gridMin}
          //   gridMax={gridMax}
        />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    alignSelf: "center",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 15,
    borderRadius: 11,
  },
  chartContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 7,
  },
});

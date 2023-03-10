import React, { useEffect } from "react";
import { StyleSheet, Text, View, Animated, Easing } from "react-native";

const SwingCapitalText = ({ text }) => {
  const swingValue = new Animated.Value(0);
  const animationDuration = 350;
  const color = "#343434";

  const swing = swingValue.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ["-17deg", "0deg", "17deg"],
  });

  const scale = swingValue.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0.98, 1, 1.02],
  });

  const transformStyle = {
    transform: [{ perspective: 200 }, { rotateX: swing }, { scale }],
    top: -1.7,
  };

  const swinging = (val) => {
    return Animated.timing(swingValue, {
      toValue: val,
      duration: animationDuration,
      useNativeDriver: true,
      easing: Easing.linear,
    });
  };

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([swinging(1), swinging(0), swinging(-1), swinging(0)])
    );
    animation.start();
    return () => {
      animation.stop();
    };
  }, []);

  return (
    <View style={styles.brandcontainer}>
      <View style={[styles.wallLeft, { backgroundColor: color }]} />
      <View style={[styles.wallRight, { backgroundColor: color }]} />
      <View style={[styles.wallTop, { backgroundColor: color }]} />
      <Animated.View style={transformStyle}>
        <View style={[styles.ropeLeft, { backgroundColor: color }]} />
        <View style={[styles.ropeRight, { backgroundColor: color }]} />
        <Text style={[styles.brand, { color: color }]}>{text}</Text>
      </Animated.View>
    </View>
  );
};

export default SwingCapitalText;

const styles = StyleSheet.create({
  brand: {
    fontSize: 25,
    fontWeight: "700",
    marginLeft: 8,
    marginRight: 8,
  },
  brandcontainer: {
    position: "relative",
    alignSelf: "flex-start",
  },
  wallLeft: {
    position: "absolute",
    right: -3,
    top: 2,
    width: 5,
    height: 33,
    transform: [{ rotateZ: "-10deg" }],
    borderTopRightRadius: 3,
    borderBottomRightRadius: 2,
    borderBottomLeftRadius: 2,
  },
  wallRight: {
    position: "absolute",
    left: -3,
    top: 2,
    width: 5,
    height: 33,
    transform: [{ rotateZ: "10deg" }],
    borderTopRightRadius: 3,
    borderBottomRightRadius: 2,
    borderBottomLeftRadius: 2,
  },
  wallTop: {
    borderTopRightRadius: 3,
    borderTopLeftRadius: 3,
    borderColor: "red",
    height: 5,
  },
  ropeLeft: {
    position: "absolute",
    height: 7.5,
    width: 4,
    left: 14,
  },
  ropeRight: {
    position: "absolute",
    height: 7.5,
    width: 3.7,
    right: 9.6,
  },
});

import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
  Easing,
} from "react-native";

const SwingCapitalText = ({text}) => {
  //animation

  const rotateX = new Animated.Value(0);

  function swing() {
    rotateX.setValue(0);
    Animated.timing(rotateX, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
      easing: Easing.InOut,
    }).start(() => swing());
  }

  useEffect(() => {
    swing();
  }, []);

  const rotate = rotateX.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["33deg", "-33deg", "33deg"],
  });

  const transformStyle = {
    transform: [{ perspective: 550 }, { rotateX: rotate }],
    top:-3
  };

  const color = "#343434";
  return (
    <View style={styles.brandcontainer}>
      <View style={[styles.wallLeft, { backgroundColor: color }]} />
      <View style={[styles.wallRight, { backgroundColor: color }]} />
      <View style={[styles.wallTop, { backgroundColor: color }]} />
      <Animated.View style={transformStyle}>
        <View style={[styles.ropeLeft, { backgroundColor: color }]} />
        <View style={[styles.ropeRight, { backgroundColor: color }]} />
        <Text style={[styles.brand, { color: color }]}>
          {text}
        </Text>
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
    alignSelf: 'flex-start' ,
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
    width: 4,
    right: 9.6,
  },
});

import { Dimensions } from "react-native";

export const numberWithCommas = (x) => {
  if (x > 1) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return x;
  }
};

export const abbreviateNumber = (value, fixed) => {
  if (value >= 1e12) {
    return (value / 1e12).toFixed(fixed) + " T";
  } else if (value >= 1e9) {
    return (value / 1e9).toFixed(fixed) + " B";
  } else if (value >= 1e6) {
    return (value / 1e6).toFixed(fixed) + " M";
  } else if (value >= 1e3) {
    return (value / 1e3).toFixed(fixed) + " K";
  } else {
    return value.toFixed(fixed);
  }
};

export const apx = (size = 0) => {
  let width = Dimensions.get("window").width;
  return (width / 750) * size;
};

export const formatDate = (dateStr) => {
  let date;
  if (typeof dateStr === "number") {
    date = new Date(dateStr * 1000);
  } else {
    date = new Date(dateStr);
  }
  let time = date.toLocaleTimeString();
  time = time.slice(0, -3);
  const options = { month: "short", day: "numeric" };
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
    " at " +
    hour +
    ":" +
    minute +
    " " +
    ampm
  );
};

import { Dimensions } from "react-native";
import moment from "moment";

export const numberWithCommas = (x) => {
  if (x > 1) {
    let [whole, decimal] = x.toString().split(".");
    whole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return decimal ? `${whole}.${decimal}` : whole;
  } else {
    if (typeof x === "number") {
      return x?.toFixed(4);
    } else {
      return null;
    }
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
    date = moment.unix(dateStr);
  } else {
    date = moment.unix(parseInt(dateStr));
  }
  
  const formattedDate = date.format("MMM D [at] h:mmA");
  return formattedDate;
};

export const formatDateString = (dateString) => {
  const date = moment(dateString);
  const month = date.format("MMM");
  const day = date.format("DD");
  const hour = date.format("hh");
  const minute = date.format("mm");
  const ampm = date.format("A");

  return `${month} ${day} at ${hour}:${minute} ${ampm}`;
};

export const formatTweetCount = (tweets) =>
  tweets.tweet_counts.data.map((i) => {
    // format data
    const unixTimestamp = Date.parse(i.end) / 1000;
    return {
      value: i.tweet_count,
      time: unixTimestamp,
    };
  });

export const formatGoogleValues = (data) =>
  data.map((i) => {
    return {
      value: i.value[0],
      time: i.time,
    };
  });

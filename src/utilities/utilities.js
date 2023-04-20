export const numberWithCommas = (x) => {
  if (x > 1) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return x;
  }
};

export const abbreviateNumber = (value,fixed) => {
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

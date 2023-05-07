import React from "react";
import Svg, { Path } from "react-native-svg";

function SVGLogo(props) {
  return (
    <Svg width="32" height="32" viewBox="0 0 32 32" {...props}>
      <Path
        fill={props.color}
        d="M31.984 27.752L29.232 5.736C28.971 3.641 27.111 2 25 2H20L12 2H7C4.888 2 3.029 3.641 2.768 5.736L0.016 27.752C-0.121 28.849 0.656 29.848 1.752 29.984C2.849 30.124 3.848 29.343 3.984 28.248L6.736 6.231C6.748 6.141 6.908 6 7 6H10C10 6 25.252 6.141 25.264 6.232L28.016 28.248C28.143 29.26 29.004 30.001 29.998 30C30.08 30 30.164 29.995 30.248 29.984C31.344 29.848 32.121 28.849 31.984 27.752Z"
      />
      <Path
        fill={props.color}
        className="swing"
        d="M22 6H16L10 6H10V18C8.896 18 8 18.896 8 20V24C8 25.104 8.896 26 10 26H22C23.104 26 24 25.104 24 24V20C24 18.896 23.104 18 22 18H22V6ZM18 18H14V6H18V18Z"
      />
    </Svg>
  );
}

export default SVGLogo;

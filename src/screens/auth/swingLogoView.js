import { Platform } from "react-native"

const phoneSize = 190;
const tabletSize = 100;

export const logoHtml = `
<head>
    <style>
        body{
            display: flex;
            align-items: center;
            justify-content: center;
            -webkit-user-select: none; 
            -ms-user-select: none; 
            user-select: none;
        }
        .swing {
        animation: swing 2s ease-in-out infinite;
        }
        @keyframes swing {
        0% {
            transform-origin: top;
            transform: perspective(550px) rotatex(33deg);
        }
        50% {
            transform: perspective(550px) rotatex(-33deg);
        }
        100% {
            transform-origin: top;
            transform: perspective(550px) rotatex(33deg);
        }
    }
    </style>
</head>
    <body scroll="no" style="overflow: hidden">
        <svg fill="#000" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        width="${Platform.isPad? tabletSize:phoneSize}px" height="${Platform.isPad? tabletSize:phoneSize}px"  viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve" >
        
            <path d="M 31.984 27.752 L 29.232 5.736 C 28.971 3.641 27.111 2 25 2 L 20 2 L 12 2 L 7 2 C 4.888 2 3.029 3.641 2.768 5.736 L 0.016 27.752 C -0.121 28.849 0.656 29.848 1.752 29.984 C 2.849 30.124 3.848 29.343 3.984 28.248 L 6.736 6.231 C 6.748 6.141 6.908 6 7 6 L 10 6 C 10 6 25.252 6.141 25.264 6.232 L 28.016 28.248 C 28.143 29.26 29.004 30.001 29.998 30 C 30.08 30 30.164 29.995 30.248 29.984 C 31.344 29.848 32.121 28.849 31.984 27.752 Z"></path>

            <path class="swing" d="M 22 6 L 16 6 L 10 6 L 10 18 C 8.896 18 8 18.896 8 20 L 8 24 C 8 25.104 8.896 26 10 26 L 22 26 C 23.104 26 24 25.104 24 24 L 24 20 C 24 18.896 23.104 18 22 18 L 22 6 Z M 18 18 L 14 18 L 14 6 L 18 6 L 18 18 Z"></path>

        </svg>
    </body>
</html>



`
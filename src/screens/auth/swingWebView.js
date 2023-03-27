export const html = (text) => `
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
        .brandcontainer {
        position: relative;
        width: 100%;
        }
        .brand {
        font-size: 5rem;
        font-weight: 700;
        margin-left: 2rem;
        margin-right: 2rem;
        color: "#000";
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        white-space: nowrap;
        }
        .swing {
        animation: swing 2s ease-in-out infinite;
        }

        .wallLeft {
        position: absolute;
        left: -12px;
        width: 15px;
        height: 115px;
        transform: rotateZ(10deg);
        border-top-left-radius: 8px;
        border-bottom-right-radius: 8px;
        border-bottom-left-radius: 8px;
        background: #000;
        }
        .wallRight {
        position: absolute;
        right: -12px;
        width: 15px;
        height: 115px;
        transform: rotateZ(-10deg);
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        border-bottom-left-radius: 8px;
        background: #000;

        }
        .wallTop {
        height: 15px;
        width: 100%;
        border-top-right-radius: 8px;
        border-top-left-radius: 8px;
        background: #000;

        }
        .ropeLeft {
        position: absolute;
        height: 20px;
        width: 12px;
        left: 50px;
        background: #000;

        }
        .ropeRight {
        position: absolute;
        height: 40px;
        width: 12px;
        right: 50px;
        background: #000;
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
<div>
    <div class="brandcontainer">
        <div class="wallLeft"></div>
        <div  class="wallRight"></div>
        <div  class="wallTop"></div>
        <div class="swing">
          <div  class="ropeLeft"></div>
          <div class="ropeRight"></div>
          <div class="brand">${text}</div>
        </div>
    </div>
</div>
</body>
</html>`;

const 정답 = "APPLE";

let index = 0;
let attempts = 0;
let timer;

function appStart() {
  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = " ";
    }
    if (index !== 0) index--;
  };
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center;position:absolute;top:40vh;left:50%;transform:translate(-50%,0%);width:200px;height:100px;background-color:tomato;font-weight:bold;";
    document.body.appendChild(div);
  };
  const gameOver = () => {
    displayGameover();
    clearInterval(timer);
    window.removeEventListener("keydown", handleKeydown);
  };
  const nextLine = () => {
    if (attempts === 6) {
      gameOver();
      return;
    }
    attempts++;
    index = 0;
  };
  const handleEnterKey = () => {
    let 맞은개수 = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );

      const 입력한글자 = block.innerText;
      const 정답글자 = 정답[i];
      const key = document.querySelector(
        `.key-block[data-key='${입력한글자}']`
      );
      if (입력한글자 === 정답글자) {
        맞은개수++;
        key.style.background = "RGB(106, 170, 100)";
        block.style.background = "RGB(106, 170, 100)";
        block.style.border = "3px solid RGB(106, 170, 100)";
      } else if (정답.includes(입력한글자)) {
        block.style.background = "RGB(201, 180, 88)";
        block.style.border = "3px solid RGB(201, 180, 88)";
        if (key.style.background !== "rgb(106, 170, 100)") {
          key.style.background = "RGB(201, 180, 88)";
        }
      } else {
        block.style.background = "RGB(120,124,126)";
        block.style.border = "3px solid RGB(120,124,126)";
        key.style.background = "RGB(120,124,126)";
      }
      block.style.color = "white";
      key.style.color = "white";
    }
    if (맞은개수 === 5) gameOver();
    nextLine();
  };

  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );
    console.log(attempts + "/" + index + "/" + thisBlock);
    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (keyCode >= 65 && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
  };
  //const 키배열 = document.querySelectorAll(".key-block");
  //const 클릭된키 = 키배열[1];
  const handleMousedown = (event) => {
    const 알파벳들 = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];
    const key = event.target.innerText;
    console.log("clicked:" + key, typeof key);
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );
    if (key === "BACK") handleBackspace();
    else if (index === 5) {
      if (key === "ENTER") handleEnterKey();
      else return;
    } else if (key === null) {
      return;
    } else if (알파벳들.includes(key)) {
      console.log(attempts + "/" + index);
      thisBlock.innerText = key;
      index += 1;
    }
  };

  const startTimer = () => {
    const 시작시간 = new Date();

    function setTime() {
      const 현재시간 = new Date();
      const 흐른시간 = new Date(현재시간 - 시작시간);
      const 분 = 흐른시간.getMinutes().toString().padStart(2, "0");
      const 초 = 흐른시간.getSeconds().toString().padStart(2, "0");
      const timediv = document.querySelector("#timer");
      timediv.innerText = `${분}:${초}`;
    }

    timer = setInterval(setTime, 1000);
  };

  startTimer();
  document.addEventListener("mousedown", handleMousedown);
  window.addEventListener("keydown", handleKeydown);
}

appStart();

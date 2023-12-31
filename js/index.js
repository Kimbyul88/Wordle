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
      "display:flex; justify-content:center; align-items:center;position:absolute;top:40vh;left:38vw;width:200px;height:100px;background-color:white";
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
      if (입력한글자 === 정답글자) {
        맞은개수++;
        block.style.background = "RGB(106, 170, 100)";
      } else if (정답.includes(입력한글자))
        block.style.background = "RGB(201, 180, 88)";
      else block.style.background = "RGB(120,124,126)";
      block.style.color = "white";
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
    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (keyCode >= 65 && keyCode <= 90) {
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
  window.addEventListener("keydown", handleKeydown);
}

appStart();

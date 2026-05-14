"use strict";
const body = document.querySelector("body");

const gameboard = (function () {
  let gameArr = Array(9).fill("");
  return {
    gameArr,
    playRound(n, sign) {
      gameArr[n] = sign;
    },
  };
})();

const createPlayer = function (name, sign) {
  return {
    name,
    sign,
  };
};

const game = (function () {
  const winningCombs = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];
  let currentPlayer = "X";
  let player1 = "";
  let player2 = "";
  return {
    winning() {
      for (let i = 0; i < winningCombs.length; i++) {
        const [a, b, c] = winningCombs[i];
        if (
          gameboard.gameArr[a] == gameboard.gameArr[b] &&
          gameboard.gameArr[a] == gameboard.gameArr[c] &&
          gameboard.gameArr[b] == gameboard.gameArr[c] &&
          gameboard.gameArr[a] !== "" &&
          gameboard.gameArr[b] !== "" &&
          gameboard.gameArr[c] !== ""
        ) {
          console.log(`${gameboard.gameArr[a]} won`);
          return true;
        }
      }
    },
    isTie() {
      const full = gameboard.gameArr.every((field) => field !== "");
      if (full) {
        console.log(`Game is tie!`);
      }
    },
    onTurn(n) {
      gameboard.gameArr[n] = currentPlayer;
      if (this.winning()) {
        return true;
      } else if (this.isTie()) {
        return true;
      } else {
        currentPlayer === "X" ? (currentPlayer = "O") : (currentPlayer = "X");
      }
    },
    getCurrentPlayer() {
      if (currentPlayer === player1.sign) {
        return player1.name;
      } else {
        return player2.name;
      }
    },
    setPlayers(p1, p2) {
      player1 = p1;
      player2 = p2;
    },
  };
})();

const displayController = function () {
  const table = document.createElement("div");
  body.appendChild(table);
  table.classList = "table";
  for (let i = 0; i < 9; i++) {
    const field = document.createElement("div");
    table.appendChild(field);
    field.classList = "field";
    const render = () => (field.textContent = gameboard.gameArr[i]);
    render();
    field.addEventListener("click", function () {
      if (gameboard.gameArr[i] !== "") {
        return;
      }
      const result = game.onTurn(i);
      render();
      if (result == true) {
        displayWinner.textContent = game.getCurrentPlayer();
      }
    });
  }
  const inputDiv = document.createElement("div");
  body.appendChild(inputDiv);
  inputDiv.classList = "inputDiv";
  const input1 = document.createElement("input");
  const input2 = document.createElement("input");
  inputDiv.appendChild(input1);
  input1.classList = "input1";
  inputDiv.appendChild(input2);
  input2.classList = "input2";
  const startBtn = document.createElement("button");
  const resetBtn = document.createElement("button");
  inputDiv.appendChild(startBtn);
  startBtn.classList = "startBtn";
  startBtn.textContent = "START";
  inputDiv.appendChild(resetBtn);
  resetBtn.classList = "resetBtn";
  resetBtn.textContent = "RESET";

  startBtn.addEventListener("click", function () {
    let player1 = createPlayer(input1.value, "X");
    let player2 = createPlayer(input2.value, "O");
    game.setPlayers(player1, player2);

    console.log(player1, player2);
  });
  const displayWinner = document.createElement("div");
  body.appendChild(displayWinner);
  displayWinner.classList = "winner";

  resetBtn.addEventListener("click", function () {
    gameboard.gameArr = Array(9).fill("");
    const fields = document.querySelectorAll(".field");
    for (let i = 0; i < fields.length; i++) {
      fields[i].textContent = "";
    }
    input1.value = "";
    input2.value = "";
    displayWinner.textContent = "";
  });
};

displayController();

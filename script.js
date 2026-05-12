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
  };
})();

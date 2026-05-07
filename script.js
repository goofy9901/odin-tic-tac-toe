"use strict";
const body = document.querySelector("body");

const gameboard = (function () {
  let gameArr = Array(9).fill("");
  return {
    gameArr,
    playRound() {},
  };
})();

const createPlayer = function (name, sign) {
  return {
    name,
    sign,
  };
};

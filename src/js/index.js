import Slot from "./Slot.js";
import Score from "./Score.js";

let totalScore = 0;

const scoreLastElement = document.getElementById("score-last");
const scoreTotalElement = document.getElementById("score-total");

const config = {
  inverted: false,

  onSpinStart: (symbols) => {
    console.log("onSpinStart", symbols);
  },

  onSpinEnd: (symbols, spinScore) => {
    totalScore += spinScore;

    scoreLastElement.textContent = spinScore;
    scoreTotalElement.textContent = totalScore;

    console.log("onSpinEnd", symbols);
    console.log("Spin score:", spinScore);
    console.log("Total score:", totalScore);
  },
};

new Slot(document.getElementById("slot"), config);

// Testing only: expose Score in the browser console.
window.Score = Score;

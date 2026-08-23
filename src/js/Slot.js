import Reel from "./Reel.js";
import Symbol from "./Symbol.js";

export default class Slot {
  constructor(domElement, config = {}) {
    Symbol.preload();

    this.currentSymbols = [
      ["z1", "z2", "z3"],
      ["z4", "z5", "z6"],
      ["z7", "z8", "z9"],
      ["z10", "z11", "z12"],
      ["z13", "z14", "z15"],
    ];

    this.nextSymbols = [
      ["z16", "z17", "z18"],
      ["z19", "z20", "z21"],
      ["z22", "z23", "z24"],
      ["z25", "z26", "z27"],
      ["z28", "z29", "z30"],
    ];

    this.container = domElement;

    this.reels = Array.from(this.container.getElementsByClassName("reel")).map(
      (reelContainer, idx) =>
        new Reel(reelContainer, idx, this.currentSymbols[idx]),
    );

    this.spinButton = document.getElementById("spin");
    this.spinButton.addEventListener("click", () => this.spin());

    this.autoPlayCheckbox = document.getElementById("autoplay");

    if (config.inverted) {
      this.container.classList.add("inverted");
    }

    this.config = config;
  }

  spin() {
    this.currentSymbols = this.nextSymbols;

    this.nextSymbols = Array.from({ length: 5 }, () => {
      const symbols = [];

      while (symbols.length < 3) {
        const symbol = Symbol.random();

        if (!symbols.includes(symbol)) {
          symbols.push(symbol);
        }
      }

      return symbols;
    });

    this.onSpinStart(this.nextSymbols);

    return Promise.all(
      this.reels.map((reel) => {
        reel.renderSymbols(this.nextSymbols[reel.idx]);
        return reel.spin();
      }),
    ).then(() => this.onSpinEnd(this.nextSymbols));
  }

  onSpinStart(symbols) {
    this.spinButton.disabled = true;

    this.config.onSpinStart?.(symbols);
  }

  onSpinEnd(symbols) {
    this.spinButton.disabled = false;

    this.config.onSpinEnd?.(symbols);

    if (this.autoPlayCheckbox.checked) {
      return window.setTimeout(() => this.spin(), 200);
    }
  }
}

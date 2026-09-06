import Reel from "./Reel.js";
import Symbol from "./Symbol.js";
import Score from "./Score.js";

const SVG_NS = "http://www.w3.org/2000/svg";

/*
 * Score -> hue mapping, ordered by score: cold cyan for small
 * wins, hot red for the big ones. One entry per payout the game
 * can actually produce.
 */
const WIN_SCORE_HUES = {
  15: 190,
  20: 204,
  35: 218,
  60: 232,
  69: 246,
  80: 261,
  90: 275,
  100: 289,
  110: 303,
  120: 317,
  160: 331,
  666: 345,
  1000: 359,
};

function getWinLineColor(score) {
  const hue = WIN_SCORE_HUES[score];

  if (hue === undefined) {
    return "hsl(43, 85%, 68%)";
  }

  return `hsl(${hue}, 85%, 68%)`;
}

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

    this.winLinesSvg = this.container.querySelector("#win-lines-content");

    this.spinButton = document.getElementById("spin");
    this.spinButton.addEventListener("click", () => this.spin());

    this.autoPlayCheckbox = document.getElementById("autoplay");

    if (config.inverted) {
      this.container.classList.add("inverted");
    }

    this.config = config;
  }

  /*
   * ============================================================
   * WINNING EVENTS
   * ============================================================
   *
   * FREQUENCIES — the min/max pairs are derived, not hand-picked.
   * A payout worth N points shows up roughly once every
   *
   *     0.38 * N * (number of events paying that same amount)
   *
   * spins, then widened by 15% either way for variety. The
   * multiplier matters: several different combinations pay 110,
   * for instance, so each of them must be correspondingly rarer
   * or the value 110 would appear three times too often.
   *
   * The result is that a payout worth more points always shows up
   * less often, with no exceptions.
   */

  getWinningEvents() {
    return [
      {
        name: "z17-z19-z14",
        min: 6,
        max: 9,
        score: 20,
        type: "exact-special",
        symbols: ["z17", "z19", "z14"],
      },

      {
        name: "z3-z4-z5",
        min: 10,
        max: 13,
        score: 15,
        type: "exact-special",
        symbols: ["z3", "z4", "z5"],
      },

      {
        name: "z17-z19-z12",
        min: 10,
        max: 13,
        score: 15,
        type: "exact-special",
        symbols: ["z17", "z19", "z12"],
      },

      {
        name: "z18-family-3",
        min: 23,
        max: 31,
        score: 35,
        type: "family",
        anchor: "z18",
        allowed: ["z16", "z23", "z28", "z29", "z30", "z34"],
        length: 3,
      },

      {
        name: "z17-family-3",
        min: 23,
        max: 31,
        score: 35,
        type: "family",
        anchor: "z17",
        allowed: ["z12", "z14", "z21", "z31"],
        length: 3,
      },

      {
        name: "z19-z15-z10",
        min: 29,
        max: 39,
        score: 90,
        type: "exact-special",
        symbols: ["z19", "z15", "z10"],
      },

      {
        name: "z19-z39-z40",
        min: 32,
        max: 44,
        score: 100,
        type: "exact-special",
        symbols: ["z19", "z39", "z40"],
      },

      {
        name: "classic-quadruple",
        min: 52,
        max: 70,
        score: 160,
        type: "classic",
        length: 4,
      },

      {
        name: "classic-triple",
        min: 58,
        max: 79,
        score: 60,
        type: "classic",
        length: 3,
      },

      {
        name: "z18-family-4",
        min: 58,
        max: 79,
        score: 60,
        type: "family",
        anchor: "z18",
        allowed: ["z16", "z23", "z28", "z29", "z30", "z34"],
        length: 4,
      },

      {
        name: "z17-family-4",
        min: 58,
        max: 79,
        score: 60,
        type: "family",
        anchor: "z17",
        allowed: ["z12", "z14", "z21", "z31"],
        length: 4,
      },

      {
        name: "z1-z2-z19",
        min: 78,
        max: 105,
        score: 80,
        type: "exact-special",
        symbols: ["z1", "z2", "z19"],
      },

      {
        name: "z18-family-5",
        min: 78,
        max: 105,
        score: 80,
        type: "family",
        anchor: "z18",
        allowed: ["z16", "z23", "z28", "z29", "z30", "z34"],
        length: 5,
      },

      {
        name: "z17-family-5",
        min: 78,
        max: 105,
        score: 80,
        type: "family",
        anchor: "z17",
        allowed: ["z12", "z14", "z21", "z31"],
        length: 5,
      },

      {
        name: "z17-z36-z21",
        min: 107,
        max: 144,
        score: 110,
        type: "exact-special",
        symbols: ["z17", "z36", "z21"],
      },

      {
        name: "z18-z36-z21",
        min: 107,
        max: 144,
        score: 110,
        type: "exact-special",
        symbols: ["z18", "z36", "z21"],
      },

      {
        name: "z19-z21-z36",
        min: 107,
        max: 144,
        score: 110,
        type: "exact-special",
        symbols: ["z19", "z21", "z36"],
      },

      {
        name: "z17-z36-z31",
        min: 116,
        max: 157,
        score: 120,
        type: "exact-special",
        symbols: ["z17", "z36", "z31"],
      },

      {
        name: "z18-z36-z31",
        min: 116,
        max: 157,
        score: 120,
        type: "exact-special",
        symbols: ["z18", "z36", "z31"],
      },

      {
        name: "z19-z31-z36",
        min: 116,
        max: 157,
        score: 120,
        type: "exact-special",
        symbols: ["z19", "z31", "z36"],
      },

      {
        name: "z1-z19-69",
        min: 201,
        max: 271,
        score: 69,
        type: "pair-69",
        symbols: ["z1", "z19"],
      },

      {
        name: "z2-z19-69",
        min: 201,
        max: 271,
        score: 69,
        type: "pair-69",
        symbols: ["z2", "z19"],
      },

      {
        name: "z10-z19-69",
        min: 201,
        max: 271,
        score: 69,
        type: "pair-69",
        symbols: ["z10", "z19"],
      },

      {
        name: "z39-z19-69",
        min: 201,
        max: 271,
        score: 69,
        type: "pair-69",
        symbols: ["z39", "z19"],
      },

      {
        name: "z40-z19-69",
        min: 201,
        max: 271,
        score: 69,
        type: "pair-69",
        symbols: ["z40", "z19"],
      },

      {
        name: "z17-z31-69",
        min: 201,
        max: 271,
        score: 69,
        type: "pair-69",
        symbols: ["z17", "z31"],
      },

      {
        name: "z18-z15-69",
        min: 201,
        max: 271,
        score: 69,
        type: "pair-69",
        symbols: ["z18", "z15"],
      },

      {
        name: "z19-z21-69",
        min: 201,
        max: 271,
        score: 69,
        type: "pair-69",
        symbols: ["z19", "z21"],
      },

      {
        name: "z17-z22-69",
        min: 201,
        max: 271,
        score: 69,
        type: "pair-69",
        symbols: ["z17", "z22"],
      },

      {
        name: "special-666",
        min: 215,
        max: 291,
        score: 666,
        type: "exact-special",
        symbols: ["z17", "z18", "z19", "z20", "z22"],
      },

      {
        name: "classic-horizontal-quintuple",
        min: 323,
        max: 437,
        score: 1000,
        type: "classic-horizontal",
        length: 5,
      },
    ];
  }

  randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  shuffle(array) {
    const result = [...array];

    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
  }

  /*
   * ============================================================
   * AVAILABLE LINES
   * ============================================================
   */

  getLines() {
    const lines = [];

    // Horizontal
    for (let row = 0; row < 3; row++) {
      const coordinates = [];

      for (let column = 0; column < 5; column++) {
        coordinates.push([column, row]);
      }

      lines.push({
        type: "horizontal",
        coordinates,
      });
    }

    // Vertical
    for (let column = 0; column < 5; column++) {
      const coordinates = [];

      for (let row = 0; row < 3; row++) {
        coordinates.push([column, row]);
      }

      lines.push({
        type: "vertical",
        coordinates,
      });
    }

    // Descending diagonals
    for (let startColumn = 0; startColumn < 5; startColumn++) {
      const coordinates = [];

      let column = startColumn;
      let row = 0;

      while (column < 5 && row < 3) {
        coordinates.push([column, row]);

        column++;
        row++;
      }

      if (coordinates.length >= 3) {
        lines.push({
          type: "diagonal",
          coordinates,
        });
      }
    }

    // Ascending diagonals
    for (let startColumn = 0; startColumn < 5; startColumn++) {
      const coordinates = [];

      let column = startColumn;
      let row = 2;

      while (column < 5 && row >= 0) {
        coordinates.push([column, row]);

        column++;
        row--;
      }

      if (coordinates.length >= 3) {
        lines.push({
          type: "diagonal",
          coordinates,
        });
      }
    }

    return lines;
  }

  /*
   * ============================================================
   * GRID
   * ============================================================
   */

  createEmptyGrid() {
    return Array.from({ length: 5 }, () => Array(3).fill(null));
  }

  fillEmptyGrid(grid) {
    for (let column = 0; column < 5; column++) {
      for (let row = 0; row < 3; row++) {
        if (grid[column][row] === null) {
          grid[column][row] = Symbol.random();
        }
      }
    }

    return grid;
  }

  setLineSymbols(grid, coordinates, symbols) {
    for (let i = 0; i < symbols.length; i++) {
      const [column, row] = coordinates[i];

      grid[column][row] = symbols[i];
    }
  }

  /*
   * ============================================================
   * EVENT BUILDERS
   * ============================================================
   */

  createClassicEvent(grid, event) {
    const validLines = this.getLines().filter((line) => {
      if (event.length === 3) {
        return true;
      }

      return (
        line.type === "horizontal" && line.coordinates.length >= event.length
      );
    });

    const line = validLines[Math.floor(Math.random() * validLines.length)];

    const start =
      line.coordinates.length === event.length
        ? 0
        : Math.floor(
            Math.random() * (line.coordinates.length - event.length + 1),
          );

    const coordinates = line.coordinates.slice(start, start + event.length);

    const symbol = Symbol.random();

    this.setLineSymbols(grid, coordinates, Array(event.length).fill(symbol));
  }

  createExactSpecialEvent(grid, event) {
    const validLines = this.getLines().filter(
      (line) => line.coordinates.length >= event.symbols.length,
    );

    const line = validLines[Math.floor(Math.random() * validLines.length)];

    const start =
      line.coordinates.length === event.symbols.length
        ? 0
        : Math.floor(
            Math.random() *
              (line.coordinates.length - event.symbols.length + 1),
          );

    const coordinates = line.coordinates.slice(
      start,
      start + event.symbols.length,
    );

    this.setLineSymbols(grid, coordinates, this.shuffle(event.symbols));
  }

  createFamilyEvent(grid, event) {
    /*
     * The length is fixed per event (3, 4 or 5), so each variant
     * has a known payout and can be tuned separately.
     */

    const length = event.length;

    const symbols = this.shuffle(event.allowed).slice(0, length - 1);

    symbols.unshift(event.anchor);

    const validLines = this.getLines().filter(
      (line) => line.coordinates.length >= length,
    );

    const line = validLines[Math.floor(Math.random() * validLines.length)];

    const start =
      line.coordinates.length === length
        ? 0
        : Math.floor(Math.random() * (line.coordinates.length - length + 1));

    const coordinates = line.coordinates.slice(start, start + length);

    this.setLineSymbols(grid, coordinates, this.shuffle(symbols));
  }

  createPair69Event(grid, event) {
    /*
     * This combination fills a whole 5-cell row. The only lines
     * that long are the three horizontal rows: collect them all
     * and pick one at random, otherwise the win would always land
     * on the same row.
     */

    const validLines = this.getLines().filter(
      (candidate) => candidate.coordinates.length === 5,
    );

    const line = validLines[Math.floor(Math.random() * validLines.length)];

    const coordinates = line.coordinates;

    const firstSymbol = event.symbols[0];
    const secondSymbol = event.symbols[1];

    const firstCount = this.randomInteger(1, 4);

    const symbols = Array(firstCount).fill(firstSymbol);

    while (symbols.length < 5) {
      symbols.push(secondSymbol);
    }

    this.setLineSymbols(grid, coordinates, this.shuffle(symbols));
  }

  /*
   * ============================================================
   * BUILDING A WINNING SPIN
   * ============================================================
   */

  createWinningCandidate(event) {
    const grid = this.createEmptyGrid();

    switch (event.type) {
      case "classic":
      case "classic-horizontal":
        this.createClassicEvent(grid, event);
        break;

      case "exact-special":
        this.createExactSpecialEvent(grid, event);
        break;

      case "family":
        this.createFamilyEvent(grid, event);
        break;

      case "pair-69":
        this.createPair69Event(grid, event);
        break;

      default:
        return null;
    }

    return this.fillEmptyGrid(grid);
  }

  generateWinningSpin(event) {
    /*
     * Build the spin repeatedly and keep only a layout whose
     * score matches the requested event exactly.
     */

    for (let attempt = 0; attempt < 5000; attempt++) {
      const candidate = this.createWinningCandidate(event);
      const score = Score.calculate(candidate);

      if (score === event.score) {
        return candidate;
      }
    }

    return null;
  }

  /*
   * ============================================================
   * PICKING AN EVENT
   * ============================================================
   *
   * Each event has a probability of:
   *
   *     1 / N
   *
   * where N is drawn at random between the min and max listed in
   * the event table.
   *
   * This means a combination can show up well before its nominal
   * interval.
   */

  chooseWinningEvent() {
    const events = this.getWinningEvents();

    const candidates = events.map((event) => ({
      event,
      probability: 1 / this.randomInteger(event.min, event.max),
    }));

    const totalProbability = candidates.reduce(
      (sum, candidate) => sum + candidate.probability,
      0,
    );

    if (Math.random() > totalProbability) {
      return null;
    }

    let random = Math.random() * totalProbability;

    for (const candidate of candidates) {
      random -= candidate.probability;

      if (random <= 0) {
        return candidate.event;
      }
    }

    return null;
  }

  generateNextSymbols() {
    const event = this.chooseWinningEvent();

    if (!event) {
      return Array.from({ length: 5 }, () => {
        const symbols = [];

        while (symbols.length < 3) {
          const symbol = Symbol.random();

          if (!symbols.includes(symbol)) {
            symbols.push(symbol);
          }
        }

        return symbols;
      });
    }

    const winningSpin = this.generateWinningSpin(event);

    if (winningSpin) {
      console.log(
        `Winning event: ${event.name}`,
        `(${event.min}-${event.max} spin)`,
        winningSpin,
      );

      return winningSpin;
    }

    /*
     * If for any reason the requested event cannot be built,
     * fall back to a plain random spin.
     */

    return Array.from({ length: 5 }, () => {
      const symbols = [];

      while (symbols.length < 3) {
        const symbol = Symbol.random();

        if (!symbols.includes(symbol)) {
          symbols.push(symbol);
        }
      }

      return symbols;
    });
  }

  /*
   * ============================================================
   * SPIN
   * ============================================================
   */

  spin() {
    this.currentSymbols = this.nextSymbols;

    this.nextSymbols = this.generateNextSymbols();

    this.clearWinningLines();
    this.onSpinStart(this.nextSymbols);

    return Promise.all(
      this.reels.map((reel) => {
        reel.renderSymbols(this.nextSymbols[reel.idx]);
        return reel.spin();
      }),
    ).then(() => {
      const { score, wins } = Score.evaluate(this.nextSymbols);

      this.renderWinningLines(wins);

      return this.onSpinEnd(this.nextSymbols, score, wins);
    });
  }

  /*
   * ============================================================
   * NEON WIN LINES
   * ============================================================
   *
   * Every winning combination in this game is a contiguous run
   * along a straight line (horizontal, vertical or diagonal)
   * defined elsewhere, so connecting the first and last cell of
   * each win's coordinates array gives the right segment. The SVG
   * overlay (#win-lines) uses a "0 0 5 3" viewBox, so the centre
   * of cell (column, row) is simply (column + 0.5, row + 0.5).
   */

  clearWinningLines() {
    this.winLinesSvg?.replaceChildren();
  }

  renderWinningLines(wins) {
    if (!this.winLinesSvg) {
      return;
    }

    this.winLinesSvg.replaceChildren();

    for (const win of wins) {
      const coordinates = win.coordinates;
      const start = coordinates[0];
      const end = coordinates[coordinates.length - 1];
      const color = getWinLineColor(win.score);

      const group = document.createElementNS(SVG_NS, "g");
      group.classList.add("win-line");

      const makeSegment = (className) => {
        const line = document.createElementNS(SVG_NS, "line");
        line.setAttribute("x1", start.column + 0.5);
        line.setAttribute("y1", start.row + 0.5);
        line.setAttribute("x2", end.column + 0.5);
        line.setAttribute("y2", end.row + 0.5);
        line.classList.add(className);
        return line;
      };

      const glowLine = makeSegment("win-line-glow");
      glowLine.style.stroke = color;
      group.appendChild(glowLine);

      group.appendChild(makeSegment("win-line-core"));

      for (const { column, row } of coordinates) {
        const makeNode = (className) => {
          const node = document.createElementNS(SVG_NS, "circle");
          node.setAttribute("cx", column + 0.5);
          node.setAttribute("cy", row + 0.5);
          node.classList.add(className);
          return node;
        };

        const glowNode = makeNode("win-line-node-glow");
        glowNode.style.fill = color;
        group.appendChild(glowNode);

        group.appendChild(makeNode("win-line-node-core"));
      }

      this.winLinesSvg.appendChild(group);
    }
  }

  onSpinStart(symbols) {
    this.spinButton.disabled = true;

    this.config.onSpinStart?.(symbols);
  }

  onSpinEnd(symbols, score, wins) {
    this.spinButton.disabled = false;

    this.config.onSpinEnd?.(symbols, score, wins);

    if (this.autoPlayCheckbox.checked) {
      return window.setTimeout(() => this.spin(), 200);
    }
  }
}

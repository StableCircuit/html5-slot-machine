export default class Score {
  static evaluate(symbols) {
    const grid = symbols.map((reel) => [...reel]);
    let score = 0;
    const wins = [];

    const recordWin = (coordinates, points) => {
      wins.push({
        coordinates: coordinates.map(([column, row]) => ({ column, row })),
        score: points,
      });
    };

    /*
     * ============================================================
     * PUNTEGGI DELLE LINEE CLASSICHE
     * ============================================================
     */

    const getLineScore = (line, coordinates, type) => {
      let lineScore = 0;
      let start = 0;

      while (start < line.length) {
        let end = start + 1;

        while (end < line.length && line[end] === line[start]) {
          end++;
        }

        const length = end - start;

        if (length >= 3) {
          let runScore = 0;

          if (length >= 5) {
            runScore = type === "horizontal" ? 1000 : 300;
          } else if (length === 4) {
            runScore = 80;
          } else if (length === 3) {
            runScore = 20;
          }

          if (runScore > 0) {
            lineScore += runScore;
            recordWin(coordinates.slice(start, end), runScore);
          }
        }

        start = end;
      }

      return lineScore;
    };

    /*
     * ============================================================
     * ESTRAZIONE DELLE LINEE (simboli + coordinate, in ordine)
     * ============================================================
     */

    const lines = [];

    // Orizzontali
    for (let row = 0; row < 3; row++) {
      const line = [];
      const coordinates = [];

      for (let column = 0; column < 5; column++) {
        line.push(grid[column][row]);
        coordinates.push([column, row]);
      }

      lines.push({
        symbols: line,
        coordinates,
        type: "horizontal",
      });
    }

    // Verticali
    for (let column = 0; column < 5; column++) {
      const line = [grid[column][0], grid[column][1], grid[column][2]];
      const coordinates = [
        [column, 0],
        [column, 1],
        [column, 2],
      ];

      lines.push({
        symbols: line,
        coordinates,
        type: "vertical",
      });
    }

    // Diagonali discendenti
    for (let startColumn = 0; startColumn < 5; startColumn++) {
      const line = [];
      const coordinates = [];

      let column = startColumn;
      let row = 0;

      while (column < 5 && row < 3) {
        line.push(grid[column][row]);
        coordinates.push([column, row]);
        column++;
        row++;
      }

      if (line.length >= 3) {
        lines.push({
          symbols: line,
          coordinates,
          type: "diagonal",
        });
      }
    }

    // Diagonali ascendenti
    for (let startColumn = 0; startColumn < 5; startColumn++) {
      const line = [];
      const coordinates = [];

      let column = startColumn;
      let row = 2;

      while (column < 5 && row >= 0) {
        line.push(grid[column][row]);
        coordinates.push([column, row]);
        column++;
        row--;
      }

      if (line.length >= 3) {
        lines.push({
          symbols: line,
          coordinates,
          type: "diagonal",
        });
      }
    }

    /*
     * ============================================================
     * COMBINAZIONI CLASSICHE
     * ============================================================
     */

    for (const line of lines) {
      score += getLineScore(line.symbols, line.coordinates, line.type);
    }

    /*
     * ============================================================
     * UTILITÀ PER LE COMBINAZIONI SPECIALI
     * ============================================================
     */

    const sameSymbols = (a, b) => {
      if (a.length !== b.length) {
        return false;
      }

      const sortedA = [...a].sort();
      const sortedB = [...b].sort();

      return sortedA.every((symbol, index) => symbol === sortedB[index]);
    };

    const hasNoDuplicates = (symbols) => {
      return new Set(symbols).size === symbols.length;
    };

    const containsOnly = (symbols, allowed) => {
      return symbols.every((symbol) => allowed.includes(symbol));
    };

    const containsRequired = (symbols, required) => {
      return required.every((symbol) => symbols.includes(symbol));
    };

    /*
     * ============================================================
     * COMBINAZIONI SPECIALI ESATTE DA 3 SIMBOLI
     * ============================================================
     */

    const exactThreeCombinations = [
      { symbols: ["z1", "z2", "z19"], score: 30 },
      { symbols: ["z19", "z39", "z40"], score: 40 },
      { symbols: ["z19", "z15", "z10"], score: 35 },
      { symbols: ["z19", "z21", "z36"], score: 45 },
      { symbols: ["z19", "z31", "z36"], score: 50 },
      { symbols: ["z18", "z36", "z31"], score: 50 },
      { symbols: ["z18", "z36", "z21"], score: 45 },
      { symbols: ["z17", "z36", "z31"], score: 50 },
      { symbols: ["z17", "z36", "z21"], score: 45 },
      { symbols: ["z3", "z4", "z5"], score: 3 },
      { symbols: ["z17", "z19", "z12"], score: 3 },
      { symbols: ["z17", "z19", "z14"], score: 5 },
    ];

    const z18Allowed = ["z18", "z16", "z23", "z28", "z29", "z30", "z34"];
    const z17Allowed = ["z17", "z12", "z14", "z21", "z31"];

    const special69Pairs = [
      ["z1", "z19"],
      ["z2", "z19"],
      ["z10", "z19"],
      ["z39", "z19"],
      ["z40", "z19"],
      ["z17", "z31"],
      ["z18", "z15"],
      ["z19", "z21"],
      ["z17", "z22"],
    ];

    const special666 = ["z17", "z18", "z19", "z20", "z22"];

    /*
     * ============================================================
     * VALUTAZIONE DELLE COMBINAZIONI SPECIALI
     * ============================================================
     */

    for (const line of lines) {
      const symbolsInLine = line.symbols;
      const coordinatesInLine = line.coordinates;

      // Combinazioni esatte da 3
      if (symbolsInLine.length >= 3) {
        for (let start = 0; start <= symbolsInLine.length - 3; start++) {
          const window = symbolsInLine.slice(start, start + 3);
          const windowCoordinates = coordinatesInLine.slice(start, start + 3);

          for (const combination of exactThreeCombinations) {
            if (sameSymbols(window, combination.symbols)) {
              score += combination.score;
              recordWin(windowCoordinates, combination.score);
            }
          }
        }
      }

      // Gruppo z18: 3 / 4 / 5
      for (let length = 5; length >= 3; length--) {
        if (symbolsInLine.length < length) {
          continue;
        }

        let found = false;

        for (let start = 0; start <= symbolsInLine.length - length; start++) {
          const window = symbolsInLine.slice(start, start + length);
          const windowCoordinates = coordinatesInLine.slice(
            start,
            start + length,
          );

          if (
            containsRequired(window, ["z18"]) &&
            containsOnly(window, z18Allowed) &&
            hasNoDuplicates(window)
          ) {
            const points = length === 3 ? 10 : length === 4 ? 20 : 30;
            score += points;
            recordWin(windowCoordinates, points);
            found = true;
            break;
          }
        }

        if (found) {
          break;
        }
      }

      // Gruppo z17: 3 / 4 / 5
      for (let length = 5; length >= 3; length--) {
        if (symbolsInLine.length < length) {
          continue;
        }

        let found = false;

        for (let start = 0; start <= symbolsInLine.length - length; start++) {
          const window = symbolsInLine.slice(start, start + length);
          const windowCoordinates = coordinatesInLine.slice(
            start,
            start + length,
          );

          if (
            containsRequired(window, ["z17"]) &&
            containsOnly(window, z17Allowed) &&
            hasNoDuplicates(window)
          ) {
            const points = length === 3 ? 10 : length === 4 ? 20 : 30;
            score += points;
            recordWin(windowCoordinates, points);
            found = true;
            break;
          }
        }

        if (found) {
          break;
        }
      }

      // Cinquine da 69
      if (symbolsInLine.length >= 5) {
        for (let start = 0; start <= symbolsInLine.length - 5; start++) {
          const window = symbolsInLine.slice(start, start + 5);
          const windowCoordinates = coordinatesInLine.slice(start, start + 5);

          for (const pair of special69Pairs) {
            if (
              containsOnly(window, pair) &&
              window.includes(pair[0]) &&
              window.includes(pair[1])
            ) {
              score += 69;
              recordWin(windowCoordinates, 69);
            }
          }
        }
      }

      // Cinquina da 666
      if (symbolsInLine.length >= 5) {
        for (let start = 0; start <= symbolsInLine.length - 5; start++) {
          const window = symbolsInLine.slice(start, start + 5);
          const windowCoordinates = coordinatesInLine.slice(start, start + 5);

          if (sameSymbols(window, special666)) {
            score += 666;
            recordWin(windowCoordinates, 666);
          }
        }
      }
    }

    return { score, wins };
  }

  static calculate(symbols) {
    return Score.evaluate(symbols).score;
  }
}

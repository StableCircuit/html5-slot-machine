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
     * PLAIN RUNS OF IDENTICAL SYMBOLS
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
            runScore = 1000;
          } else if (length === 4) {
            runScore = 160;
          } else if (length === 3) {
            runScore = 60;
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
     * LINE EXTRACTION (symbols + coordinates, in order)
     * ============================================================
     */

    const lines = [];

    // Horizontal
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

    // Vertical
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

    // Descending diagonals
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

    // Ascending diagonals
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
     * SCORING THE PLAIN RUNS
     * ============================================================
     */

    for (const line of lines) {
      score += getLineScore(line.symbols, line.coordinates, line.type);
    }

    /*
     * ============================================================
     * HELPERS FOR THE SPECIAL COMBINATIONS
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
     * EXACT THREE-SYMBOL SPECIAL COMBINATIONS
     * ============================================================
     */

    const exactThreeCombinations = [
      { symbols: ["z1", "z2", "z19"], score: 80 },
      { symbols: ["z19", "z39", "z40"], score: 100 },
      { symbols: ["z19", "z15", "z10"], score: 90 },
      { symbols: ["z19", "z21", "z36"], score: 110 },
      { symbols: ["z19", "z31", "z36"], score: 120 },
      { symbols: ["z18", "z36", "z31"], score: 120 },
      { symbols: ["z18", "z36", "z21"], score: 110 },
      { symbols: ["z17", "z36", "z31"], score: 120 },
      { symbols: ["z17", "z36", "z21"], score: 110 },
      { symbols: ["z3", "z4", "z5"], score: 15 },
      { symbols: ["z17", "z19", "z12"], score: 15 },
      { symbols: ["z17", "z19", "z14"], score: 20 },
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
     * EVALUATING THE SPECIAL COMBINATIONS
     * ============================================================
     */

    for (const line of lines) {
      const symbolsInLine = line.symbols;
      const coordinatesInLine = line.coordinates;

      // Exact three-symbol combinations
      if (symbolsInLine.length >= 3) {
        for (let start = 0; start <= symbolsInLine.length - 3; start++) {
          const segment = symbolsInLine.slice(start, start + 3);
          const segmentCoordinates = coordinatesInLine.slice(start, start + 3);

          for (const combination of exactThreeCombinations) {
            if (sameSymbols(segment, combination.symbols)) {
              score += combination.score;
              recordWin(segmentCoordinates, combination.score);
            }
          }
        }
      }

      // z18 group: 3 / 4 / 5
      for (let length = 5; length >= 3; length--) {
        if (symbolsInLine.length < length) {
          continue;
        }

        let found = false;

        for (let start = 0; start <= symbolsInLine.length - length; start++) {
          const segment = symbolsInLine.slice(start, start + length);
          const segmentCoordinates = coordinatesInLine.slice(
            start,
            start + length,
          );

          if (
            containsRequired(segment, ["z18"]) &&
            containsOnly(segment, z18Allowed) &&
            hasNoDuplicates(segment)
          ) {
            const points = length === 3 ? 35 : length === 4 ? 60 : 80;
            score += points;
            recordWin(segmentCoordinates, points);
            found = true;
            break;
          }
        }

        if (found) {
          break;
        }
      }

      // z17 group: 3 / 4 / 5
      for (let length = 5; length >= 3; length--) {
        if (symbolsInLine.length < length) {
          continue;
        }

        let found = false;

        for (let start = 0; start <= symbolsInLine.length - length; start++) {
          const segment = symbolsInLine.slice(start, start + length);
          const segmentCoordinates = coordinatesInLine.slice(
            start,
            start + length,
          );

          if (
            containsRequired(segment, ["z17"]) &&
            containsOnly(segment, z17Allowed) &&
            hasNoDuplicates(segment)
          ) {
            const points = length === 3 ? 35 : length === 4 ? 60 : 80;
            score += points;
            recordWin(segmentCoordinates, points);
            found = true;
            break;
          }
        }

        if (found) {
          break;
        }
      }

      // Lucky 69: a full five-cell row of just two symbols
      if (symbolsInLine.length >= 5) {
        for (let start = 0; start <= symbolsInLine.length - 5; start++) {
          const segment = symbolsInLine.slice(start, start + 5);
          const segmentCoordinates = coordinatesInLine.slice(start, start + 5);

          for (const pair of special69Pairs) {
            if (
              containsOnly(segment, pair) &&
              segment.includes(pair[0]) &&
              segment.includes(pair[1])
            ) {
              score += 69;
              recordWin(segmentCoordinates, 69);
            }
          }
        }
      }

      // The 666: a full five-cell row with one exact symbol set
      if (symbolsInLine.length >= 5) {
        for (let start = 0; start <= symbolsInLine.length - 5; start++) {
          const segment = symbolsInLine.slice(start, start + 5);
          const segmentCoordinates = coordinatesInLine.slice(start, start + 5);

          if (sameSymbols(segment, special666)) {
            score += 666;
            recordWin(segmentCoordinates, 666);
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

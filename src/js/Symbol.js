const cache = {};

/*
 * Built once at module load instead of on every access. The old
 * version rebuilt a 40-item array inside the getter, and random()
 * hit that getter twice per call, so a spin that probes thousands
 * of candidate grids was allocating millions of throwaway arrays.
 */
const SYMBOL_NAMES = Object.freeze(
  Array.from({ length: 40 }, (_, index) => `z${index + 1}`),
);

export default class Symbol {
  constructor(name = Symbol.random()) {
    this.name = name;

    if (cache[name]) {
      this.img = cache[name].cloneNode();
    } else {
      this.img = new Image();
      this.img.src = require(`../assets/symbols/png/${name}.png`);

      cache[name] = this.img;
    }
  }

  static preload() {
    Symbol.symbols.forEach((symbol) => new Symbol(symbol));
  }

  static get symbols() {
    return SYMBOL_NAMES;
  }

  static random() {
    return SYMBOL_NAMES[Math.floor(Math.random() * SYMBOL_NAMES.length)];
  }
}

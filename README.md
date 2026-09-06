# HTML5 Slot Machine — Customized Educational Version

🎰 **[Play the Live Demo](https://stablecircuit.github.io/html5-slot-machine/)**

A personal educational project based on the original [HTML5 Slot Machine](https://github.com/johakr/html5-slot-machine) repository by **Johannes Kronmüller**.

This is a customized, modified and extended version of the original project, developed as a personal, educational and non-commercial programming exercise.

**No real money, betting, wagering, purchase, or payout of any kind is involved.** Scores are points displayed on screen and have no monetary value. The score counter resets on every page load: there is no account system, no saved progress, no leaderboard, and no server-side storage of scores or player data.

---

## About This Version

This fork keeps the original project's core concept while introducing substantial custom development in the visual design, symbol system, game logic, scoring, probability handling, win-line presentation, and user interface.

The project is intentionally presented as an educational and personal experiment rather than as a commercial product.

## A Note on the Symbols and Combinations

Some of the artwork and several of the winning combinations may look arbitrary to most visitors. This is intentional.

The slot machine was built partly to entertain a specific small group of people who recognize the references behind the images and understand why certain symbols pay out together. Some of these pairings are private jokes and shared memories rather than conventional game-design choices.

If you have landed here without that context, nothing is missing on your end. The game is fully playable as an ordinary slot machine, and the paytable lists every available combination and its value. The references simply may not have any particular meaning to you.

---

## Customizations & Contributions

The following are the main modifications and additions made in this fork:

* Complete visual redesign of the layout, panels, controls, and overall presentation.
* Custom **Ancient Gold** visual theme and page styling.
* Custom page backgrounds, including a dedicated variant for narrow screens.
* Replacement of the original slot symbols with **40 custom PNG symbols**.
* Custom symbol selection logic across all 40 symbols.
* Duplicate-symbol prevention within the three visible cells of a reel.
* Complete scoring engine added in `src/js/Score.js`.
* Support for multiple categories of winning combinations, including:

  * runs of identical symbols;
  * two-symbol groups;
  * exact three-symbol combinations;
  * two-symbol full-row combinations;
  * a five-symbol jackpot row.
* Probability handling designed around the payout value of each combination.
* Animated **neon LED win lines** rendered as an SVG overlay after each spin.
* Win lines are colour-coded according to the value of the win.
* New score display and supporting UI.
* New paytable and donation panels.
* Autoplay functionality and custom-styled controls.
* Removal of the original jackpot display.
* Additional modifications to reel, symbol, slot and game-flow behaviour.

The original project remains credited below, and this repository intentionally remains a fork of the original work.

---

## Features

* **Five reels** with three visible rows.
* **14 winning lines**:

  * 3 horizontal rows;
  * 5 vertical columns;
  * 6 diagonals.
* **40 custom PNG symbols** (`z1.png` to `z40.png`).
* Custom scoring engine.
* Multiple types of winning combinations.
* Probability system that controls the frequency of combinations according to their payout value.
* Animated neon LED win lines using an SVG overlay.
* Win-line colours based on the value of the win.
* Paytable and score panels.
* Donation box.
* Autoplay toggle.
* Custom control bar.
* Responsive page background with a dedicated narrow-screen variant.
* No real-money gambling or wagering functionality.

---

## Installation

Install the project dependencies:

```bash
npm install
```

## Development

Start the local development server:

```bash
npm start
```

Then open:

```text
http://localhost:8080
```

## Production Build

Create a production build with:

```bash
npm run build
```

---

## Project Structure

### Slot Symbols

The custom slot symbols are located in:

```text
src/assets/symbols/png/
```

The files are named:

```text
z1.png
z2.png
...
z40.png
```

### Backgrounds

The page backgrounds are located in:

```text
src/assets/bg.jpg
src/assets/bg_small.jpg
```

### Scoring

The custom scoring engine is implemented in:

```text
src/js/Score.js
```

---

## Original Project

This repository is a fork of the original **HTML5 Slot Machine** project by **Johannes Kronmüller**:

https://github.com/johakr/html5-slot-machine

The original project is distributed under the **MIT License**. The original copyright notice and MIT License are retained in the `LICENSE` file.

This fork does not claim ownership of the original project or its original code.

---

## Visual Assets, Trademarks and Third-Party Rights

The visual assets used in this project may depict or contain trademarks, registered trademarks, service marks, logos, names, characters, fictional entities, artwork, designs, symbols, likenesses, images, or other elements of intellectual property belonging to third parties.

All such third-party rights remain the exclusive property of their respective owners. No ownership, title, copyright, trademark right, service mark right, publicity right, design right, or other intellectual-property right in any third-party material is claimed, transferred, assigned, or otherwise asserted by this project or its author.

The inclusion of any third-party trademark, logo, character, name, artwork, symbol, likeness, or other protected element is not intended to suggest, imply, or create any affiliation, sponsorship, endorsement, partnership, authorization, approval, or other relationship between the respective rights holder and this project or its author.

No claim is made that these elements are created, licensed, endorsed, approved, sponsored, or otherwise authorized by their respective rights holders, except where such authorization may independently exist.

The visual assets are included solely as part of a personal, educational and non-commercial programming and design exercise, within the context of the author's own study, experimentation, testing, and development activities.

The author does not intend to use these assets, or any third-party intellectual property contained within them, for advertising, marketing, promotion, merchandising, commercial exploitation, or any other activity intended to derive financial benefit from the reputation, goodwill, identity, or intellectual property of a third party.

No visual asset is intended to be used in a manner that is defamatory, disparaging, derogatory, misleading, deceptive, malicious, abusive, threatening, obscene, discriminatory, or otherwise harmful to any person, company, organization, brand, trademark owner, copyright owner, or other rights holder.

In particular, nothing in this project is intended to ridicule, denigrate, insult, attack, discredit, defame, falsely associate, or otherwise portray in a negative or misleading manner any individual, company, organization, brand, fictional character, trademark, or other third-party intellectual property represented in the visual assets.

The presence of any particular character, logo, trademark, symbol, name, or other protected element within a slot-machine symbol, and the grouping of certain symbols into winning combinations, is purely illustrative and functional within the context of this personal project.

It should not be interpreted as expressing any opinion, criticism, political position, commercial message, endorsement, sponsorship, or statement concerning the respective rights holder or the subject represented.

Any third-party intellectual property remains subject to the rights, terms, conditions, licenses, and legal protections applicable to its respective owner.

The presence of any third-party material in this repository should not be interpreted as a license, permission, authorization, or grant of rights to reproduce, distribute, modify, publish, commercialize, or otherwise exploit that material.

This project is published on the public internet through GitHub Pages so that a small group of people can access and use the educational demonstration. Public availability does not change its personal and non-commercial purpose.

Should this project or any of its assets be incorporated into another product, redistributed, or used for commercial purposes, the relevant copyright, trademark, publicity, licensing, privacy, and other intellectual-property requirements should be independently reviewed and any necessary permissions or licenses obtained before such use.

If you are a rights holder and object to the use of any asset in this repository, please contact the author through GitHub and the relevant asset will be removed.

This disclaimer documents the intended purpose and context of the visual assets. It does not purport to waive, limit, replace, or otherwise alter any rights or remedies available to the respective owners of third-party intellectual property.

---

## Deployment

This project is deployed using **GitHub Actions** and **GitHub Pages**.

The live version is available here:

🎰 **[Play the Live Demo](https://stablecircuit.github.io/html5-slot-machine/)**

---

## Disclaimer

This project is provided solely for personal, educational and non-commercial purposes.

It is not intended to represent, reproduce, or commercially exploit any third-party brand, company, product, character, trademark, artwork, or other intellectual property.

No affiliation, sponsorship, endorsement, authorization, or partnership with any third-party rights holder is implied.

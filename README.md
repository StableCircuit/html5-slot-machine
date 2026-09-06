# HTML5 Slot Machine — Customized Educational Version

A customized and modified version of the original **HTML5 Slot Machine** project by **Johannes Kronmüller**, rebuilt as a private, non-commercial programming exercise.

No real money, betting, wagering, purchase, or payout of any kind is involved. Scores are points on screen and nothing else. The score counter resets on every page load: there is no account, no saved progress, no leaderboard, and no server storing anything.

## A Note on the Symbols and Combinations

Some of the artwork, and several of the winning combinations, will look arbitrary to most visitors. That is expected and intentional.

This slot machine was built partly to entertain a specific small group of people who recognize the references behind the images and understand why certain symbols pay out together. Those pairings are private jokes and shared memories, not design mistakes and not hidden messages aimed at anyone outside that group.

If you have landed here without that context, nothing is missing on your end: the game is perfectly playable as an ordinary slot machine, and the paytable lists every combination and its value. The references simply will not mean anything to you, and they are not meant to.

## Features

- Five reels, three visible rows, and 14 winning lines: 3 horizontal rows, 5 vertical columns, and 6 diagonals.
- 40 custom PNG symbols (`z1.png` to `z40.png`).
- Scoring engine covering plain runs of identical symbols, two symbol groups, twelve exact three-symbol combinations, nine two-symbol full-row combinations, and one five-symbol jackpot row.
- Probability system that steers how often each combination appears. Frequencies are derived from each combination's payout, so a combination worth more points always appears less often.
- Animated neon win lines drawn as an SVG overlay after each spin, colour-coded by the value of the win.
- Side panels for the paytable link and the score, plus a donation box.
- Autoplay toggle and a custom-styled control bar.
- Custom page background, with a lighter variant for narrow screens.

## Changes from the Original Project

- Custom background images (`bg.jpg`, `bg_small.jpg`).
- All 40 slot symbols replaced.
- Random symbol selection across the 40 custom symbols, with duplicate symbols prevented within the three visible cells of a reel.
- Original jackpot display removed.
- Complete scoring system added (`src/js/Score.js`), which the original project did not have.
- Complete visual redesign of the layout, panels, and controls.

## Installation

Install the project dependencies:

```
npm install
```

## Development

Start the local development server:

```
npm start
```

Then open:

```
http://localhost:8080
```

## Production Build

Create a production build with:

```
npm run build
```

## Project Structure

The custom slot symbols are located in:

```
src/assets/symbols/png/
```

The files are named:

```
z1.png
z2.png
...
z40.png
```

The page backgrounds are located in:

```
src/assets/bg.jpg
src/assets/bg_small.jpg
```

## Original Project

Original project by **Johannes Kronmüller**:

https://github.com/johakr/html5-slot-machine

The original project is distributed under the MIT License. The original copyright notice and MIT License are retained in the `LICENSE` file.

## Visual Assets, Trademarks and Third-Party Rights

The visual assets used in this project may depict or contain trademarks, registered trademarks, service marks, logos, names, characters, fictional entities, artwork, designs, symbols, likenesses, images, or other elements of intellectual property belonging to third parties. All such third-party rights remain the exclusive property of their respective owners. No ownership, title, copyright, trademark right, service mark right, publicity right, design right, or other intellectual-property right in any third-party material is claimed, transferred, assigned, or otherwise asserted by this project or its author.

The inclusion of any third-party trademark, logo, character, name, artwork, symbol, likeness, or other protected element is not intended to suggest, imply, or create any affiliation, sponsorship, endorsement, partnership, authorization, approval, or other relationship between the respective rights holder and this project or its author. No claim is made that these elements are created, licensed, endorsed, approved, sponsored, or otherwise authorized by their respective rights holders, except where such authorization may independently exist.

The visual assets are included solely as part of a private, personal, educational and non-commercial programming and design exercise, within the context of the author's own study, experimentation, testing, and development activities. The author does not intend to use them, or any third-party intellectual property contained within them, for advertising, marketing, promotion, merchandising, commercial exploitation, or any other activity intended to derive financial benefit from the reputation, goodwill, identity, or intellectual property of a third party.

No visual asset is intended to be used in a manner that is defamatory, disparaging, derogatory, misleading, deceptive, malicious, abusive, threatening, obscene, discriminatory, or otherwise harmful to any person, company, organization, brand, trademark owner, copyright owner, or other rights holder. In particular, nothing here is intended to ridicule, denigrate, insult, attack, discredit, defame, falsely associate, or otherwise portray in a negative or misleading manner any individual, company, organization, brand, fictional character, trademark, or other third-party intellectual property represented in the visual assets.

The presence of any particular character, logo, trademark, symbol, name, or other protected element within a slot-machine symbol, and the grouping of certain symbols into winning combinations, is purely illustrative and functional within the context of this private project. It should not be interpreted as expressing any opinion, criticism, political position, commercial message, endorsement, sponsorship, or statement concerning the respective rights holder or the subject represented.

Any third-party intellectual property remains subject to the rights, terms, conditions, licenses, and legal protections applicable to its respective owner. The presence of any third-party material in this repository should not be interpreted as a license, permission, authorization, or grant of rights to reproduce, distribute, modify, publish, commercialize, or otherwise exploit that material.

This project is published on the public internet through GitHub Pages so that a small group of people can reach it. Should it be incorporated into another product, or used for commercial purposes, the relevant copyright, trademark, publicity, licensing, privacy, and other intellectual-property requirements should be independently reviewed and any necessary permissions or licenses obtained before such use.

If you are a rights holder and object to the use of any asset in this repository, contact the author through GitHub and the asset will be removed.

This disclaimer documents the intended purpose and context of the visual assets and does not purport to waive, limit, replace, or otherwise alter any rights or remedies available to the respective owners of third-party intellectual property.

## Deployment

This project is deployed using GitHub Actions and GitHub Pages.

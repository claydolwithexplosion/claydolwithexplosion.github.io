---
layout: base
---

<style>
	:root {
		font-size: 18px;
	}
	body {
		font-size: inherit;
	}
</style>

# The Dogū Codex
This is a website, where I (claydolwithexplosion, Mettrich) want to store the codes for the Pokemon Gen 3 games (Ruby/Sapphire, Firered/Leafgrean, Emerald) that I deem most useful. For now it's pretty much only codes for Emerald.

## Summary
- [About ACE](#about-ace)
- [Getting ACE](#getting-ace)
- [Box Name Codes](#box-name-codes)
- [WELDR Base64 Write](#weldr)
- [TorchicOS](#torchicos)

## About ACE
ACE stands for "Arbitrary Code Execution" and generally is a glitch mechanic, that allows the player to execute specific data in the game as machine code, which allows to do totally unintended things, that are often close in their abilities to cheat engines.

However, ACE doesn't actually use any cheat hardware or software and the-like, it is basically just a smart way to exploit unintended game mechanics to make the game do things we want it to do. Thus, you can execute it on an unmodded, normal console, and usually on emulators too (though there may be inaccuracies leading to slightly different codes).

In the Pokemon games, ACE is generally really powerful, because there are many ways to input text into the game, especially the box names, so you don't need any specific position, or crazy input sequences to execute ACE codes, all you need to do is copy the code **EXACTLY**.

## Getting ACE
To execute ACE codes in the Pokemon Gen 3 games, you need to do a little bit of setup to get the initial glitch working. This varies a lot between the games:

- [in Emerald](getting-ace-emerald) you use Glitzer Popping to get glitch species with glitch animations that trigger ACE (upon being hatched, with stable ACE by viewing the summary screen); the other games don't have Pokemon animations
- [in FR/LG (Firered/Leafgreen)](https://pomeg-letterbombers.github.io/pokemon-ace-notes/frlg-introduction/) you use the mail glitch with Recycle to create a species that executes ACE upon being grabbed in the PC
- [in R/S (Ruby/Sapphire)](getting-ace-rs/index.html) you use the mail glitch to overflow a string and get a glitch name, which you use to trigger BiT (Back-in-Time) ACE, and use that to get a 0x44fc Pokemon, which triggers ACE upon viewing its summary

## Box Name Codes
TODO

## WELDR
See [here](weldr/), WIP

## TorchicOS
See [here](torchicos/), very WIP
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

LightSaber: Arduino lightsaber firmware (ATtiny1616 / megaTinyCore, NeoPixel blade, JQ8400 MP3 sound module, MPU6050 motion, one button).
Moved here from a Claude chat project on 2026-11-19. Earlier sketches live in `C:\Users\hogfa\Documents\Arduino\` (newest: `Lightsaber1616Version70`).

**Read [PROGRESS.md](PROGRESS.md) first.** [PROJECT-NOTES.md](PROJECT-NOTES.md) is the spec and settled truth (hardware, pins, decisions, gotchas); read only the part you need.

## Docs (four files, one job each)
- `CLAUDE.md`: permanent rules and commands only. No brainstorming.
- `PROGRESS.md`: current target, what just broke, next step. If an idea changes direction, replace the old target.
- `PROJECT-NOTES.md`: the spec (acts as the FSD) and settled truth. Add only things that are built and verified; no history or failed attempts.
- `IDEAS.md`: backlog and parking lot for untested ideas. Don't read it unless asked or when picking the next task. When the user says "park this", append one line under "Backlog / Parking Lot" and go back to the current task without discussing it. At session end, if asked, promote verified items to PROJECT-NOTES.md and remove them.

## Rules
- Don't read `firmware/build/`, `~/.arduino15`, Arduino `libraries/` or `media/` unless asked.
- Never commit `media/` (sound files, pictures). Commit as hogfanboy (noreply), never the Gmail.
- The user does the hardware and judges by eye/ear: give them clear test steps, not photos.
- After any driver, feature or bug fix, update PROGRESS.md (under 60 lines): working state and verified pins, active bug or next task, key decisions (no failed attempts). Then say: "Task complete and PROGRESS.md updated. Ready for /clear."

## Layout
- `firmware/`: sketches (one folder per sketch).
- `tools/`: helper scripts. `docs/`: wiring diagrams, notes for others.

## Build
Arduino CLI: `/c/Users/hogfa/AppData/Local/Programs/arduino-cli/arduino-cli.exe` (not on PATH). Board/core and upload method: TBD, fill in once confirmed.

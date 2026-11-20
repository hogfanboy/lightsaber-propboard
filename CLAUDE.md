# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Lightsaber PropBoard V1: an 18 x 90 mm, nearly all-SMD lightsaber board (ESP32-C3, NS4168 I2S amp, TP4056 charger,
LIS2DTW12 accelerometer, WS2812 blade, one USB-C) designed in EasyEDA Pro through its API, assembled by JLCPCB.
Built by students in a high-school club (they solder only the JST connectors). Firmware not written yet.
This folder is the clone of a **public** GitHub repo: keep personal and school details out of committed files.

**Read [PROGRESS.md](PROGRESS.md) first.** [PROJECT-NOTES.md](PROJECT-NOTES.md) is the spec and settled truth (parts, pins, power behavior, firmware requirements, designer preferences); read only the part you need.

## Docs (four files, one job each)
- `CLAUDE.md`: permanent rules and commands only. No brainstorming.
- `PROGRESS.md`: current target, what just broke, next step. If an idea changes direction, replace the old target.
- `PROJECT-NOTES.md`: the spec (acts as the FSD) and settled truth. Add only things that are built and verified; no history or failed attempts.
- `IDEAS.md`: backlog and parking lot for untested ideas. Don't read it unless asked or when picking the next task. When the user says "park this", append one line under "Backlog / Parking Lot" and go back to the current task without discussing it. At session end, if asked, promote verified items to PROJECT-NOTES.md and remove them.
- `tools/easyeda/API-NOTES.md`: EasyEDA Pro API gotchas. **Read it before writing any EasyEDA script.**

## Rules
- The user is a self-described beginner with Arduino code and toolchain settings: explain in plain-language steps.
- Cost matters (school budget): prefer JLCPCB basic parts, Economic assembly, no X-ray parts. Check https://jlcpcb.com/parts/in-stock-parts.
- Always run DRC after any PCB change, and trust DRC over the autorouter's report.
- Don't read `tools/easyeda/relay/`, `firmware/build/`, `~/.arduino15`, Arduino `libraries/` or `media/` unless asked.
- Never commit `media/` (sound files, pictures) or `CLAUDE NOTES.md` (raw handoff). Commit as hogfanboy (noreply), never the Gmail.
- After any design change, feature or bug fix, update PROGRESS.md (under 60 lines): working state, active bug or next task, key decisions (no failed attempts). Then say: "Task complete and PROGRESS.md updated. Ready for /clear."

## Layout
- `tools/easyeda/`: the Claude <-> EasyEDA bridge (`call.py`, `relay.mjs`) and reusable board scripts (`v6/` current, `v4/` older).
  Old scratch output (JSON dumps, logs, renders) stays in `Documents\EasyEDA-Claude\pcb\`; don't copy it here.
- `firmware/`: Arduino sketches (none yet). `docs/`: future GitHub Pages site / web flasher.

## EasyEDA bridge (run in terminal tabs the user can see)
1. User: EasyEDA Pro open with the PropBoard_V1 project; Run API Gateway extension has "Allow interact with external" on.
2. API server: `cd %USERPROFILE%\Documents\EasyEDA-Claude\easyeda-api-skill-main` then `npm run server` (third-party, stays outside the repo).
3. Relay: `cd tools\easyeda` then `node relay.mjs`.
4. User: EasyEDA menu API Gateway > Reconnect.
5. From `tools/easyeda`: `python call.py health` (also `windows`, `exec '<js>'`, `execfile <file.js>`). `call_long.py` = same with ~14 min wait.

IDs: schematic tab `dae18600ee42196f`; PCB tab `b3a6afff1e9d1cad` (live PCB1). Backups: `PCB1_layout_v1_backup` (99ece18c120675a0), `PropBoard_V1_PCB_draft_backup`.
Start every PCB script with `await eda.dmt_EditorControl.openDocument("b3a6afff1e9d1cad")` plus a short wait.

## Build (firmware, once it exists)
Arduino CLI: `/c/Users/hogfa/AppData/Local/Programs/arduino-cli/arduino-cli.exe` (not on PATH). Board settings TBD.

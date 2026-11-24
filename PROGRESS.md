# PROGRESS

## Current target
PropBoard V1 ready to order from JLCPCB. No rush: the club builds it in fall 2027.

## Working state (2026-11-19)
- Schematic final, reviewed, netlist matches PCB.
- PCB layout v2 routed from scratch, DRC 0 errors, GND pours top + bottom.
- 2026-11-16: D5 (USBLC6-2SC6, blade ESD) pin 6 tied to BLADE_A (pins 1+6 = BLADE_A, 3+4 = BLADE_B,
  5 = VSW, 2 = GND). Done in schematic and PCB by the designer; **pour rebuild + DRC not re-run yet.**
- Last quote: 50 boards Economic = $258.86 (PCB $14.50, PCBA $244.36: components $189.66 for 28 items,
  extended-parts fee $24.72).

## Next steps
1. Pour rebuild + DRC after the D5 change (`v4/z_rb.js`, then `v6/drcrun.js`).
2. Designer: move RED/BLK labels near BAT2 (+ now on tip side), delete SMD designators, add logo + version.
   Delete old floating blade net labels in the schematic (API can't reach them).
3. Find Preferred Extended versions of LDO, USB-C, crystal, USBLC6 to cut the $24.72 fee.
4. Decide if the 19-23 mil blade-power necks are enough (23 mil ~ 1.6 A at 10 C rise).
5. Re-open Quote & Order so Gerbers/BOM/CPL regenerate. Leave SPK1, BAT2, PWR_BTN, BLADE1 out of assembly.
6. Pick first order size: 5 (~$125), 20-30, or 50 (~$325-350).
7. First prototype: read sensor WHO_AM_I (expect 0x11) before trusting it. Then start firmware.

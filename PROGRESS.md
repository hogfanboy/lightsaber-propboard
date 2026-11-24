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

## Side project: BoosterTestJig (EasyEDA project "BoosterTestJig", started 2026-11-23)
Test jig for MT3608 and SX1308 boost modules: a module sits on pogo pins (pressed into sleeves in the
through holes) and an ESP32-C3 0.42" OLED board (U3) reads battery and boost-output voltage.
- Board 90 x 70 mm, 3 mm corners, 4 x M3 holes, 1 GND pour, no vias. DRC 0 errors (2026-11-23).
- Parts: TP4056 module (U4), JST-PH battery (CN2), SW1 power, HT7833 3.3 V LDO (U1), buttons OK/DOWN/UP
  (BT1-3), buzzer SG2 via 2N7000 Q2, dividers R2/R6 (VBAT_SENSE) and R7/R8 (VOUT_SENSE).
- Pogo holes checked against the real modules by the designer, 2.4 mm drill (hole centres, mil):
  MT3608 IN+/IN- at x1660, OUT+/OUT- at x460; rows y645/y345 (30.48 x 7.62 mm pitch).
  SX1308 (U2) IN at x2205, OUT at x2905; rows y700/y300 (17.78 x 10.16 mm pitch).
- Open: confirm 2.4 mm matches the pogo sleeve datasheet; set R6/R7/R8 values (only R2 = 100k is set).

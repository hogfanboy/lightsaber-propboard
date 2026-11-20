# PROJECT NOTES (spec and settled truth)

Lightsaber PropBoard V1. Replaces the 2021 Version 7.0 board (ATtiny1616 + soft latch + MT3608 5 V boost + JQ8400
sound + MPU6050 + TP4056 modules, 18 x 100 mm) with a nearly all-SMD board. About 40 boards a year.

## Mechanical
- Slides into 3/4 in SDR 21 PVC pipe (ID ~22.6-23.6 mm) with a lengthwise slot.
- Board 18 x 90 mm, 2 layers, 1.5 mm corner fillets.
- USB end = bottom cap (speaker in the bottom cap). Tip end = blade end. Power button sits a couple of inches past the tip end.
- Battery: 500 mAh max fits (old saber ran 60 WS2812 on 230 mAh fine). Must be a **protected** cell: no battery protection on the board.
- Blade: two 30-LED WS2812 ECO strips (60/m) back to back on a 3/8 in bamboo stick, wrapped in white foam.
  WS2812 only. Two data wires (one per strip). No 5 V boost: blade runs on VSW.

## Floor plan (x = 0 USB end -> x = 90 mm tip end)
1. USB / audio / battery: USB1, D2 ESD, CC resistors, BAT2 (top) / SPK1 (bottom) mirrored, U3 amp beside SPK1, Q4 beside BAT2.
2. Power: charger U2, load sharing (Q1, D1), soft latch, LDO1.
3. Controller: U1 ESP32-C3 + crystal + decoupling, SW1 BOOT / SW2 EN mirrored, battery divider.
4. Motion: U4 + R15/R16 + caps (toward tip, more motion there); IO-08 LED parts.
5. Tip: D5 + R17/R18 + C20, then PWR_BTN and BLADE1 in line.

## Key parts
| Ref | Part | LCSC | Notes |
|---|---|---|---|
| U1 | ESP32-C3FH4 (4 MB flash) | C2858491 | Radio unused; no antenna parts |
| X1 | 40 MHz 15 pF crystal | C9010 | Extended; C14/C15 22 pF (C1653) |
| U2 | TP4056 (UMW, ESOP-8) | C725790 | R7 = 3k (~400 mA). Cheaper alt: TP4054 C5381776 |
| U3 | NS4168 I2S amp | C910588 | CTRL on GPIO2; 3.3 V CTRL = right channel, so send audio on both |
| U4 | MSKSEMI LIS2DTW12TR-MS | C50385412 | Accel only. Not X-ray. NOT LIS2DW12TR-MS C50385411 (X-ray) |
| LDO1 | ME6211C33 | | VSW -> 3V3 |
| Q1 | AO3401A | | Load sharing, with D1 SS34 (C8678, basic) |
| Q4 | AO3401A | C15127 | Battery reverse polarity; gate 100k R21 (C25803) to GND |
| D2 | USBLC6-2SC6 | C2827654 | USB ESD |
| D5 | USBLC6-2SC6 | C2827654 | Blade data ESD: 1+6 = BLADE_A, 3+4 = BLADE_B, 5 = VSW, 2 = GND |
| SW1, SW2 | TS-1088-AR02016 | C720477 | Basic. SW1 BOOT, SW2 EN |
| R17, R18 | 330 ohm | C23138 | One per blade data line |
| R19/R20/C21 | 100k/100k/100nF | C25803/C14663 | Battery sense divider off VSW |
| BAT2 | JST PH 2-pin B2B-PH-K-S | C131337 | Student-soldered; + on the tip side |
| SPK1 | JST XH 2-pin | C158012 | Student-soldered |
| BLADE1, PWR_BTN | JST XH 4-pin B4B-XH-A | C144395 | Student-soldered; pin rows across board width |

## Pin plan (ESP32-C3)
| GPIO | Net | Use |
|---|---|---|
| 0 | VSW_ADC | Battery voltage (divider = VSW/2; read x 2; set low-battery cutoff with blade lit) |
| 1 | Button | Holds the soft latch AND reads the button |
| 2 | IO-02 | Amp CTRL, 10k pull-up R13 (on by default; pull low to mute) |
| 3 | MPU_INT | Sensor INT1 (push-pull, active high) |
| 4 / 5 | SDA / SCL | Sensor I2C, 4.7k pull-ups R15/R16 |
| 6 / 7 / 10 | I2S_BCLK / I2S_LRC / I2S_DIN | Amplifier |
| 8 | IO-08 | Blink LED + button LED, 10k pull-up (strapping pin: must not be pulled low at boot) |
| 9 | BOOT | Boot button, 10k pull-up |
| 18 / 19 | USB_D- / USB_D+ | USB |
| 20 | BLADE | WS2812 data (feeds BLADE_A and BLADE_B via R17/R18) |
| 21 | - | Spare (start-up text) |

## Connectors
- **PWR_BTN**: 1 = 3V3, 2 = IO-08 (button LED), 3 = Button, 4 = GND. Old board was GND, LED, button, GND: old harnesses don't match.
- **BLADE1**: 1 = VSW, 2 = BLADE_A, 3 = BLADE_B, 4 = GND. Same plug as PWR_BTN, so label both on silkscreen.

## Power / soft latch
- USB (VBUS) or battery -> load sharing -> VSYS -> soft latch -> VSW -> LDO -> 3V3.
- D3: plugging in USB turns the board on (for flashing). So it can't switch off while on USB.
- Button must be held until firmware starts and drives GPIO1 to hold the latch (C3 boots slower than the ATtiny).
- EN press or any crash on battery switches the board off (latch lets go). On USB it restarts.
- Blade data is 3.3 V; on USB the strip supply is ~4.7 V, borderline for WS2812. Flicker only on USB points here.
- Blade power tracks: rule `blade30` (0.762 mm) on VBAT, VSYS, VSW, $1N327; necks of 19-23 mil remain. VBUS on rule `power` (0.4 mm).

## Firmware requirements (not written yet)
- Arduino IDE. Students flash from a GitHub web page (like the designer's other ESP32-C3 projects), no drag-and-drop.
- Sounds in a LittleFS image (~1 min of 16-bit 22 kHz mono in 4 MB, estimate).
- Button: single press turns on; short press while on = change mode (e.g. blade color); long press while on = power off (release latch).
- Effects from the old saber, including an unstable blade. Cap blade brightness in firmware.

### Accelerometer (MSKSEMI LIS2DTW12TR-MS, LIS3DH-style registers; NOT ST's LIS2DW12, which reads 0x44)
- I2C 0x19 (SDO open). WHO_AM_I 0x0F = 0x11; VERSION 0x70 = 0x28.
- CTRL_REG0 0x1F, CTRL_REG1 0x20 (ODR[7:4] + XYZ enables), CTRL_REG4 0x23 (BDU bit 7, FS bits 5:4), STATUS 0x27,
  OUT_X_L 0x28 ... OUT_Z_H 0x2D (set bit 7 of sub-address for auto-increment).
- ODR codes: 1=1.56, 2=12.5, 3=25, 4=50, 5=100, 6=200, 7=400, 8=800 Hz.
- 12-bit left-justified: shift right 4; 1/2/4/8 mg per digit for +-2/4/8/16 g.
- Starter (untested): `Wire.begin(4,5)`; check 0x0F == 0x11; write 0x57 -> 0x20; write 0xA0 -> 0x23;
  read 6 bytes from 0x28|0x80; axis = `(int16_t)((hi<<8)|lo) >> 4`, x 4 mg.
- LGA-12: 1 SDO, 2 SDA, 3 VDDIO, 4 NC, 5 INT1, 6 INT2, 7 VDD, 8 GNDIO, 9 GND, 10 CS (high = I2C), 11 NC, 12 SCL.

## Designer preferences
- Silkscreen: no SMD designators; font Serpentine Bold Oblique; always a version number; RED/BLK battery labels on front AND back; club logo; bottom silk NOT mirrored.
- Layout: symmetry like professional boards (BAT2/SPK1 mirrored at USB end, SW1/SW2 mirrored, PWR_BTN and BLADE1 in line at tip). Routability over looks.
- All SMD on top. JSTs on top too; students solder from the bottom.
- JST pads enlarged in footprints: XH oval 1.7 x 3.5 mm (hole 1.0); PH (BAT2) oval ~1.6 x 3.0 mm.
- Schematic: net-label text fitted inside the label when it fits.
- No test pads, no repair of dead boards, no panelizing.
- JLCPCB Economic assembly; leave SPK1, BAT2, PWR_BTN, BLADE1 out of assembly.

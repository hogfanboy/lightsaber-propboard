await eda.dmt_EditorControl.openDocument("b3a6afff1e9d1cad"); await new Promise(r=>setTimeout(r,800));
const r3=v=>Math.round(v*1000)/1000;
const V=(await eda.pcb_PrimitiveVia.getAll()).filter(v=>v.getState_Net()==="GND");
let nv=0;
for(const v of V){ const a=[r3(v.getState_X()),r3(v.getState_Y()),v.getState_HoleDiameter(),v.getState_Diameter()];
  await eda.pcb_PrimitiveVia.delete(v.getState_PrimitiveId()); if(await eda.pcb_PrimitiveVia.create("GND",a[0],a[1],a[2],a[3])) nv++; }
const L=(await eda.pcb_PrimitiveLine.getAll()).filter(l=>l.getState_Net()==="GND"&&[1,2].includes(l.getState_Layer()));
let nl=0;
for(const l of L){ const a=[l.getState_Layer(),r3(l.getState_StartX()),r3(l.getState_StartY()),r3(l.getState_EndX()),r3(l.getState_EndY()),l.getState_LineWidth()];
  await eda.pcb_PrimitiveLine.delete(l.getState_PrimitiveId()); if(await eda.pcb_PrimitiveLine.create("GND",a[0],a[1],a[2],a[3],a[4],a[5],false)) nl++; }
await eda.pcb_Document.save(); return [V.length,nv,L.length,nl];

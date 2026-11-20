await eda.dmt_EditorControl.openDocument("b3a6afff1e9d1cad"); await new Promise(r=>setTimeout(r,800));
const all=(await eda.pcb_PrimitiveLine.getAll()).filter(l=>l.getState_Net()==="GND"&&[1,2].includes(l.getState_Layer()));
let n=0;
for(const l of all){ const a=[l.getState_Net(),l.getState_Layer(),l.getState_StartX(),l.getState_StartY(),l.getState_EndX(),l.getState_EndY(),l.getState_LineWidth()];
  await eda.pcb_PrimitiveLine.delete(l.getState_PrimitiveId());
  if(await eda.pcb_PrimitiveLine.create(a[0],a[1],a[2],a[3],a[4],a[5],a[6],false)) n++; }
await eda.pcb_Document.save(); return [all.length,n];

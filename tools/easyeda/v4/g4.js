await eda.dmt_EditorControl.openDocument('b3a6afff1e9d1cad');
await new Promise(r=>setTimeout(r,1500));
const out={pads:[],lines:[],vias:[],arcs:[]};
const all = await eda.pcb_PrimitiveComponent.getAll();
for (const c of all){ const p=await eda.pcb_PrimitiveComponent.getAllPinsByPrimitiveId(c.getState_PrimitiveId());
  for (const q of p){ let pad; try{pad=q.getState_Pad();}catch(e){} out.pads.push([c.getState_Designator(),q.getState_PadNumber(),q.getState_X(),q.getState_Y(),q.getState_Net(),q.getState_Layer(),q.getState_Rotation&&q.getState_Rotation(),pad]); } }
const lines = await eda.pcb_PrimitiveLine.getAll();
out.lines=lines.map(l=>[l.getState_Net(),l.getState_Layer(),l.getState_StartX(),l.getState_StartY(),l.getState_EndX(),l.getState_EndY(),l.getState_LineWidth()]);
const vias = await eda.pcb_PrimitiveVia.getAll();
out.vias=vias.map(v=>[v.getState_Net(),v.getState_X(),v.getState_Y(),v.getState_Diameter&&v.getState_Diameter(),v.getState_HoleDiameter&&v.getState_HoleDiameter()]);
try{const ar=await eda.pcb_PrimitiveArc.getAll(); out.arcs=ar.map(a=>[a.getState_Net(),a.getState_Layer(),a.getState_StartX(),a.getState_StartY(),a.getState_EndX(),a.getState_EndY(),a.getState_ArcAngle()]);}catch(e){}
return out;

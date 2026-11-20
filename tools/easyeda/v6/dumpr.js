await eda.dmt_EditorControl.openDocument("b3a6afff1e9d1cad"); await new Promise(r=>setTimeout(r,1000));
const L=(await eda.pcb_PrimitiveLine.getAll()).map(x=>[x.getState_Net(),x.getState_Layer(),x.getState_StartX(),x.getState_StartY(),x.getState_EndX(),x.getState_EndY(),x.getState_LineWidth()]);
const V=(await eda.pcb_PrimitiveVia.getAll()).map(x=>[x.getState_Net(),x.getState_X(),x.getState_Y(),x.getState_HoleDiameter(),x.getState_Diameter()]);
let A=[]; try{ A=(await eda.pcb_PrimitiveArc.getAll()).map(x=>[x.getState_Net(),x.getState_Layer()]);}catch(e){A=String(e)}
return {L,V,A};

await eda.dmt_EditorControl.openDocument("b3a6afff1e9d1cad"); await new Promise(r=>setTimeout(r,800));
const nets=__NETS__;
const L=(await eda.pcb_PrimitiveLine.getAll()).filter(l=>nets.includes(l.getState_Net())).map(l=>l.getState_PrimitiveId());
const V=(await eda.pcb_PrimitiveVia.getAll()).filter(l=>nets.includes(l.getState_Net())).map(l=>l.getState_PrimitiveId());
if(L.length) await eda.pcb_PrimitiveLine.delete(L); if(V.length) await eda.pcb_PrimitiveVia.delete(V);
globalThis.__ar=[];
(async()=>{ for(const n of __ORDER__){ try{ const r=await eda.pcb_Document.autoRouting({RoutingNets:[n],existingPrimitiveMode:"keep"}); globalThis.__ar.push([n,r.successNetsCount,r.failedNets]);}catch(e){globalThis.__ar.push([n,"ERR "+e]);} } globalThis.__ar.push("done"); })();
return [L.length,V.length];

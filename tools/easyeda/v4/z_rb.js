await eda.dmt_EditorControl.openDocument('b3a6afff1e9d1cad'); await new Promise(r=>setTimeout(r,500));
const res=[];
for(const p of await eda.pcb_PrimitivePour.getAll()){try{const r=await p.rebuildCopperRegion(); res.push(['ok',typeof r, r&&r.getState_PrimitiveId?r.getState_PrimitiveId():String(r).slice(0,50)]);}catch(e){res.push(['err',e.message]);}}
return res;

await eda.dmt_EditorControl.openDocument("b3a6afff1e9d1cad"); await new Promise(r=>setTimeout(r,800));
const out=[];
for (const [L,n] of [[1,"GND_TOP"],[2,"GND_BOT"]]) {
  const poly = eda.pcb_MathPolygon.createPolygon([-20,-380,"L",-20,380,3570,380,3570,-380,-20,-380]);
  const p = await eda.pcb_PrimitivePour.create("GND", L, poly, "solid", false, n, 1, 0.2, false);
  out.push(!!p); try{ await p.rebuildCopperRegion(); }catch(e){out.push(String(e));}
}
await eda.pcb_Document.save(); return out;

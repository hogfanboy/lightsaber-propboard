await eda.dmt_EditorControl.openDocument('b3a6afff1e9d1cad'); await new Promise(r=>setTimeout(r,800));

await eda.pcb_Document.save();
const r = await eda.pcb_Drc.check(true,false,true);
const out=[];
const walk=(x)=>{ if(Array.isArray(x)) x.forEach(walk); else if(x&&typeof x==='object'){ if(x.errorType){ out.push([x.errorType,x.errorObjType,(x.obj1&&x.obj1.suffix)||'',(x.obj2&&x.obj2.suffix)||'',x.layer||'',x.net||'']); } else Object.values(x).forEach(walk); } };
walk(r);
return {n:out.length,items:out.slice(0,40)};

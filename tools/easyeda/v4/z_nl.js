await eda.dmt_EditorControl.openDocument('dae18600ee42196f'); await new Promise(r=>setTimeout(r,1200));
const f=await eda.sch_ManufactureData.getNetlistFile(); const t=await f.text(); const j=JSON.parse(t);
const out={};
for(const [id,c] of Object.entries(j.components||{})){ const des=c.props&&(c.props.Designator||c.props.designator); const m={}; for(const [k,v] of Object.entries(c.pinInfoMap||{})) m[v.number||k]=v.net; out[des||id]=m; }
return out;

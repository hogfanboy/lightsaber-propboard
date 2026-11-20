await eda.dmt_EditorControl.openDocument("b3a6afff1e9d1cad"); await new Promise(r=>setTimeout(r,1500));
return await eda.pcb_Drc.check(true,false,true);

await eda.dmt_EditorControl.openDocument("b3a6afff1e9d1cad"); await new Promise(r=>setTimeout(r,1000));
return {name: await eda.pcb_Drc.getCurrentRuleConfigurationName(), nr: await eda.pcb_Drc.getNetRules(), nbn: await eda.pcb_Drc.getNetByNetRules(), nc: await eda.pcb_Drc.getAllNetClasses()};

import json,collections,sys;d=json.load(open(sys.argv[1]))['data']['result']
out=[]
def walk(x,path):
  if isinstance(x,dict):
    if 'errorType' in x and 'obj1' in x:
      p=x['explanation']['param']; out.append(('/'.join(path),x['obj1'].get('suffix'),(x.get('obj2') or {}).get('suffix'),p.get('minDistance'),round(x['pos']['x']*10),round(x['pos']['y']*10)))
    for v in x.get('list',[]) or []: walk(v,path+[x.get('name','')])
  elif isinstance(x,list):
    for v in x: walk(v,path)
walk(d,[])
print(len(out),collections.Counter(o[0] for o in out))
for o in out: print(o)

#!/usr/bin/env python3
# usage: call.py health | windows | exec '<js code>' | execfile <file.js>
import sys, json, os, time, uuid
root = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'relay')
def send(req, wait=int(os.environ.get("W","90"))):
    name = '%d-%s.json' % (time.time()*1000, uuid.uuid4().hex[:6])
    tmp = os.path.join(root, 'inbox', name + '.tmp')
    with open(tmp, 'w') as f: json.dump(req, f)
    os.rename(tmp, os.path.join(root, 'inbox', name))
    out = os.path.join(root, 'outbox', name)
    t = time.time()
    while time.time() - t < wait:
        if os.path.exists(out):
            time.sleep(0.05)
            return json.load(open(out))
        time.sleep(0.15)
    return {'ok': False, 'error': 'no reply from relay (is relay.mjs running?)'}
cmd = sys.argv[1]
if cmd == 'health': r = send({'path': '/health'})
elif cmd == 'windows': r = send({'path': '/eda-windows'})
elif cmd in ('exec', 'execfile'):
    code = sys.argv[2] if cmd == 'exec' else open(sys.argv[2]).read()
    r = send({'path': '/execute', 'method': 'POST', 'body': {'code': code}, 'timeoutMs': 60000})
print(json.dumps(r, indent=1, ensure_ascii=False))

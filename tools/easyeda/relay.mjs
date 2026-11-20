// Claude <-> EasyEDA bridge relay.
// Reads request files from relay/inbox, forwards them ONLY to the local
// EasyEDA bridge (127.0.0.1:49620-49629), writes answers to relay/outbox.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), 'relay');
const inbox = path.join(root, 'inbox');
const outbox = path.join(root, 'outbox');
const done = path.join(root, 'done');
for (const d of [inbox, outbox, done]) fs.mkdirSync(d, { recursive: true });

let port = null;
async function findBridge() {
  for (let p = 49620; p <= 49629; p++) {
    try {
      const r = await fetch(`http://127.0.0.1:${p}/health`, { signal: AbortSignal.timeout(1500) });
      const j = await r.json();
      if (j.service === 'easyeda-bridge') return p;
    } catch {}
  }
  return null;
}

async function handle(file) {
  const src = path.join(inbox, file);
  let out;
  try {
    const req = JSON.parse(fs.readFileSync(src, 'utf8'));
    if (!port) port = await findBridge();
    if (!port) throw new Error('bridge not found on ports 49620-49629');
    const p = String(req.path || '/health');
    if (!p.startsWith('/')) throw new Error('bad path');
    const opt = { method: req.method || 'GET', signal: AbortSignal.timeout(req.timeoutMs || 60000) };
    if (req.body !== undefined) {
      opt.headers = { 'Content-Type': 'application/json' };
      opt.body = JSON.stringify(req.body);
    }
    const r = await fetch(`http://127.0.0.1:${port}${p}`, opt);
    const text = await r.text();
    let data; try { data = JSON.parse(text); } catch { data = text; }
    out = { ok: r.ok, status: r.status, data };
  } catch (e) {
    port = null;
    out = { ok: false, error: String(e && e.message || e) };
  }
  const tmp = path.join(outbox, file + '.tmp');
  fs.writeFileSync(tmp, JSON.stringify(out, null, 1));
  fs.renameSync(tmp, path.join(outbox, file));
  try { fs.renameSync(src, path.join(done, file)); } catch {}
  console.log(new Date().toLocaleTimeString(), file, out.ok ? 'ok' : 'FAILED: ' + (out.error || out.status));
}

console.log('Claude relay running. Watching', inbox);
console.log('Leave this window open. Press Ctrl+C to stop.');
let busy = false;
setInterval(async () => {
  if (busy) return; busy = true;
  try {
    const files = fs.readdirSync(inbox).filter(f => f.endsWith('.json')).sort();
    for (const f of files) await handle(f);
  } finally { busy = false; }
}, 300);

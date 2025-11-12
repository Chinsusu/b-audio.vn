export interface Env {
  APP_NAME: string;
  KV_META: KVNamespace;
  R2_AUDIO: R2Bucket;
  DB: D1Database;
}

const json = (data: unknown, init: ResponseInit = {}) =>
  new Response(JSON.stringify(data), {
    headers: { 'content-type': 'application/json; charset=utf-8' },
    ...init,
  });

const html = (markup: string, init: ResponseInit = {}) =>
  new Response(markup, { headers: { 'content-type': 'text/html; charset=utf-8' }, ...init });

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    try {
      const url = new URL(req.url);
      const { pathname } = url;

      // Normalize trailing slash for health
      if (pathname === '/api/v1/health' || pathname === '/api/v1/health/') {
        return json({ ok: true, ts: Date.now(), app: env.APP_NAME || 'b-audio' });
      }

      // Audio metadata: /api/v1/audio/:id/meta
      if (pathname.startsWith('/api/v1/audio/') && pathname.endsWith('/meta')) {
        const id = decodeURIComponent(pathname.split('/')[4] || '');
        if (!id) return json({ code: 'BAD_REQUEST', message: 'Missing id' }, { status: 400 });
        const raw = await env.KV_META.get(`audio:meta:${id}`);
        if (!raw) return json({ code: 'NOT_FOUND', message: 'Metadata not found' }, { status: 404 });
        return json({ id, meta: JSON.parse(raw) });
      }

      // Audio stream: /api/v1/audio/:id/stream
      if (pathname.startsWith('/api/v1/audio/') && pathname.endsWith('/stream')) {
        const id = decodeURIComponent(pathname.split('/')[4] || '');
        if (!id) return json({ code: 'BAD_REQUEST', message: 'Missing id' }, { status: 400 });
        const obj = await env.R2_AUDIO.get(id);
        if (!obj) return json({ code: 'NOT_FOUND', message: 'Audio not found' }, { status: 404 });
        const headers = new Headers();
        headers.set('Content-Type', obj.httpMetadata?.contentType ?? 'application/octet-stream');
        headers.set('Content-Length', String(obj.size));
        headers.set('ETag', obj.etag);
        headers.set('Cache-Control', 'public, max-age=3600');
        headers.set('Accept-Ranges', 'bytes');
        return new Response(obj.body, { headers });
      }

      // Root UI
      if (pathname === '/' || pathname === '') {
        const name = env.APP_NAME || 'b-audio';
        return html(`<!doctype html>
        <html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>${name} • Public UI</title>
        <style>:root{color-scheme:light dark}body{font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;margin:0;padding:24px;line-height:1.5}header{margin-bottom:16px}.card{border:1px solid #ccc;border-radius:8px;padding:16px;margin-bottom:16px}label{display:block;font-weight:600;margin-bottom:6px}input{padding:8px;width:100%;max-width:360px}button{padding:8px 12px;margin-right:8px;cursor:pointer}pre{background:rgba(0,0,0,.05);padding:12px;border-radius:6px;overflow:auto}footer{margin-top:24px;font-size:12px;opacity:.8}.row{display:flex;gap:12px;align-items:center;flex-wrap:wrap}</style>
        </head><body>
        <header><h1>${name} — Public UI</h1><div>Endpoints: <code>/api/v1/health</code>, <code>/api/v1/audio/:id/meta</code>, <code>/api/v1/audio/:id/stream</code></div></header>
        <section class="card"><h2>Health</h2><div class="row"><button id="btn-health">Ping Health</button><span id="health-status"></span></div><pre id="health-out" hidden></pre></section>
        <section class="card"><h2>Audio</h2><label for="audio-id">Audio ID</label><div class="row"><input id="audio-id" placeholder="e.g. my-audio-key.mp3"/><button id="btn-meta">Get Metadata</button><button id="btn-play">Play Stream</button></div><pre id="meta-out" hidden></pre><audio id="player" controls style="margin-top:12px;max-width:560px;"></audio></section>
        <footer><div>Time: <span id="now"></span></div></footer>
        <script>const $=s=>document.querySelector(s);const out=(el,data)=>{el.hidden=false;el.textContent=typeof data==="string"?data:JSON.stringify(data,null,2)};const hb=document.getElementById('btn-health');const ho=document.getElementById('health-out');const hs=document.getElementById('health-status');const mb=document.getElementById('btn-meta');const pb=document.getElementById('btn-play');const mo=document.getElementById('meta-out');const ai=document.getElementById('audio-id');const pl=document.getElementById('player');const now=document.getElementById('now');now.textContent=new Date().toLocaleString();const base='';hb.addEventListener('click',async()=>{hs.textContent='…';try{const r=await fetch(base+'/api/v1/health');const j=await r.json();hs.textContent=r.ok?'OK':'Error';out(ho,j)}catch(e){hs.textContent='Network error';out(ho,String(e))}});mb.addEventListener('click',async()=>{const id=ai.value.trim();if(!id)return alert('Enter audio ID');mo.hidden=true;try{const r=await fetch(base+'/api/v1/audio/'+encodeURIComponent(id)+'/meta');const j=await r.json();out(mo,j)}catch(e){out(mo,String(e))}});pb.addEventListener('click',async()=>{const id=ai.value.trim();if(!id)return alert('Enter audio ID');pl.src=base+'/api/v1/audio/'+encodeURIComponent(id)+'/stream';pl.play().catch(()=>{})});</script>
        </body></html>`);
      }

      return json({ code: 'NOT_FOUND' }, { status: 404 });
    } catch (e: any) {
      return json({ code: 'ERR', message: e?.message ?? 'Internal Error' }, { status: 500 });
    }
  },
};


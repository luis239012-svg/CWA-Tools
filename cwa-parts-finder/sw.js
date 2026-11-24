const CACHE='cwa-parts-finder-v1';
const ASSETS=[
  './',
  'index.html',
  'manifest.json',
  'icon-192.svg',
  'icon-512.svg',
  'icon-maskable.svg',
  'data/meta.json',
  'data/stock.json',
  'data/p_enercon.txt',
  'data/p_vestas.txt',
  'data/p_senvion.txt',
  'data/p_siemens.txt',
  'data/p_sg.txt',
  'data/p_nordex.txt',
  'data/p_ewt.txt',
  'data/p_powerwind.txt',
  'data/p_tools.txt',
  'data/p_ppe.txt',
  'data/p_it.txt',
  'data/p_opus.txt'
];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  if(e.request.url.includes('fonts.googleapis.com')||e.request.url.includes('fonts.gstatic.com')){
    e.respondWith(fetch(e.request).catch(()=>new Response('',{status:200,headers:{'Content-Type':'text/css'}})));
    return;
  }
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});

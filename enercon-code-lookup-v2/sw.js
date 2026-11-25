const PREFIX='enercon-code-lookup-v2-';
const CACHE_NAME=PREFIX+'v4';
const ASSETS=['./','./index.html','./manifest.json','./icon-192.svg','./icon-512.svg','./icon-maskable.svg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith(PREFIX)&&k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(caches.open(CACHE_NAME).then(cache=>cache.match(e.request).then(cached=>{
    const net=fetch(e.request).then(res=>{if(res.ok)cache.put(e.request,res.clone());return res;}).catch(()=>cached);
    return cached||net;
  })));
});

const CACHE='jigyo-v1';
const ASSETS=['/zen-101/','/zen-101/index.html','/zen-101/manifest.json','/zen-101/icon-192.png','/zen-101/icon-512.png','/zen-101/apple-touch-icon.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{if(resp.ok){const c=resp.clone();caches.open(CACHE).then(cache=>cache.put(e.request,c))}return resp}))));

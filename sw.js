const CACHE='hub-trainer-v7';
const ASSETS=['/amzl-quiz/','/amzl-quiz/index.html','/amzl-quiz/game.js','/amzl-quiz/questions.js','/amzl-quiz/nodes.js','/amzl-quiz/nodemap.js','/amzl-quiz/scenarios.js','/amzl-quiz/connections.js','/amzl-quiz/glossary.js','/amzl-quiz/podcast.js','/amzl-quiz/achievements.js','/amzl-quiz/auth.js','/amzl-quiz/sop.js','/amzl-quiz/logo.png'];

self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))});

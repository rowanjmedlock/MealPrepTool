const CACHE_NAME = 'prepweek-v2';
const ASSETS = [
  '/MealPrepTool/',
  '/MealPrepTool/index.html',
  '/MealPrepTool/manifest.json',
  '/MealPrepTool/icon-192.png',
  '/MealPrepTool/icon-512.png'
];

// Install: cache all assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS.filter(asset => {
        // Skip icons if they don't exist yet — won't break install
        return true;
      }));
    }).catch(err => {
      console.log('Cache install partial failure (icons may be missing):', err);
    })
  );
  self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch: cache-first strategy (works fully offline after first load)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // Cache successful responses
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        // If fetch fails and nothing cached, return offline fallback
        return caches.match('./prepweek_pwa.html');
      });
    })
  );
});

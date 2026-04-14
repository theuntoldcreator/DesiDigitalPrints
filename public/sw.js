const CACHE_NAME = 'desi-studio-admin-v1';
const ASSETS_TO_CACHE = [
  '/admin',
  '/images/logo.png',
  '/admin.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Only handle GET requests or requests to our domain
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((response) => {
        // Cache the login page and core site logic
        if (response.ok && (event.request.url.includes('/admin') || event.request.url.includes('.js') || event.request.url.includes('.css'))) {
           const responseClone = response.clone();
           caches.open(CACHE_NAME).then((cache) => {
             cache.put(event.request, responseClone);
           });
        }
        return response;
      });
    })
  );
});

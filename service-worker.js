const CACHE_NAME = 'barrel-calculator-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/barrel-192.png',
  '/barrel-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
// service-worker.js

// Install event
self.addEventListener('install', event => {
  console.log('Service Worker: Installed');
  // Perform install steps
  event.waitUntil(
    caches.open('static-v1').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/styles.css',
        '/script.js',
        '/favicon_berty—andriod-chrome-192x192.png',
        '/Icon_Bird_512x512.png'
      ]);
    })
  );
});

// Activate event
self.addEventListener('activate', event => {
  console.log('Service Worker: Activated');
  // Perform activate steps
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== 'static-v1') {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  console.log('Service Worker: Fetching');
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

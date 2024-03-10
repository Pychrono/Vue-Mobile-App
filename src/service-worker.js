// Define a cache name
const CACHE_NAME = 'v1_cache';
// Specify the files you want to cache
const urlsToCache = [
    '/',
    '/index.html',
    '/js/app.b4670569.js', // Update with actual hashed filename
    '/css/app.6015f54c.css', // Update with actual hashed filename
    'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
    '/img/icons/Logo-1080x675.png',
];

// Install event - caches specified files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

// Fetch event to serve cached content
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            // Cache hit - return response
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});
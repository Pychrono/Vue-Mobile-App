// Define a cache name
var cacheName = 'v1_cache';
// Specify the files you want to cache
var cacheFiles ={
"../public/index.html",
"../public/img/icons/icon.webp"
"../public/img/icons/icon2.webp"
};

self.addEventListener("install", function(e) {
console.log("[Service Worker] Install");
e.waitUntil(
caches.open(cacheName).then(function(cache){
console.log("[Service Worker] Caching files");
return cache.addAll(cacheFiles);
})
);
});

// Install event - caches specified files
//self.addEventListener('install', event => {
//    event.waitUntil(
//        caches.open(CACHE_NAME)
//        .then(cache => {
//            console.log('Opened cache');
//            return cache.addAll(cachefiles);
//        })
//    );
//});
//
//// Fetch event to serve cached content
//self.addEventListener('fetch', event => {
//    event.respondWith(
//        caches.match(event.request)
//        .then(response => {
//            // Cache hit - return response
//            if (response) {
//                return response;
//            }
//            return fetch(event.request);
//        })
//    );
//});
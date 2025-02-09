const CACHE_NAME = "to-do-app-cache-v2";
const ASSETS_TO_CACHE = [
    "/",
    "/index.html",
    "/todostyle.css",
    "/todo.js",
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

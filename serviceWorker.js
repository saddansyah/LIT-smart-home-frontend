const CACHE_NAME = "version-1";
const assets = ['index.html', 'offline.html']

const self = this;

// Install SW
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('caching all assets');
            return cache.addAll(assets);
        })
    );
});

// Listen for requests
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cacheRes => {
            return cacheRes || fetch(event.request).catch(() => caches.match('offline.html'));
        })
    );
});

// Activate the SW
self.addEventListener('activate', event => {
    const cacheList = [];
    cacheList.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.map((key) => {
                    if(!cacheList.includes(key)) {return caches.delete(key)}
                })
            );
        })
    );
});
/**
 * Created by pengchaoyang on 2019/2/20
 */
self.importScripts('./faster/config.js');

var cacheName=config.cache.cacheName
var urlsToCache=config.cache.urlsToCache
function addCache (event) {
    event.waitUntil(
        caches.open(cacheName)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
}
function respondWithCache (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                    // Cache hit - return response
                    if (response) {
                        return response;
                    }
                    return fetch(event.request);
                }
            )
    );
    return true
}
/**
 * use service worker to make your web faster
 * Created by pengchaoyang on 2019/2/19
 */
"use strict";
self.importScripts('./faster/config.js');
self.importScripts('./faster/image.js');
self.importScripts('./faster/cache.js');
self.importScripts('./faster/push.js');


self.addEventListener('install', function(event) {
    console.log('Service Worker installing.....');
    // Perform install steps
    addCache(event)
});

self.addEventListener('activate', function(event) {
    console.log('Service Worker activating...');
});

// Listen to fetch events
self.addEventListener('fetch', function(event) {
    // console.log(event.request.url)
    //hit
    if(fasterImage(event,{})) return
    if(config.cache.isOpen&&respondWithCache (event)) return
});

self.addEventListener('push', function(event) {
    if(config.push.isOpen){
        handlePushMsg (event)
    }
});




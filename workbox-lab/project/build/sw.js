/*
Copyright 2018 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js"
);

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  workbox.precaching.precacheAndRoute([
    {
      url: "style/main.css",
      revision: "c7a02441b4914ffdc39eb2eb55148adc",
    },
    {
      url: "index.html",
      revision: "79aa7a17b4b103fb2f8b01ba45717799",
    },
    {
      url: "js/animation.js",
      revision: "3f8fd475afa44c10b3107178a83bd9ae",
    },
    {
      url: "images/home/business.jpg",
      revision: "9c3ec8d2a8a188bab9ddc212a64a0c1e",
    },
    {
      url: "images/icon/icon.svg",
      revision: "d582b402cdafcc4a3934fba3986d1be7",
    },
    {
      url: "pages/offline.html",
      revision: "4a9a5105e6c974c6deec1c8893d00961",
    },
    {
      url: "pages/404.html",
      revision: "2f404c2bc9d919f3dcad5c8e570bc1bf",
    },
  ]);
  workbox.routing.registerRoute(
    /(.*)articles(.*)\.(?:png|gif|jpg)/,
    workbox.strategies.cacheFirst({
      cacheName: "images-cache",
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        }),
      ],
    })
  );

  const articleHandler = workbox.strategies.networkFirst({
    cacheName: "articles-cache",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 50,
      }),
    ],
  });

  workbox.routing.registerRoute(/(.*)\.html/, (args) => {
    return articleHandler.handle(args).then((response) => {
      if (!response) {
        return caches.match("pages/offline.html");
      } else if (response.status === 404) {
        return caches.match("pages/404.html");
      }
      return response;
    });
  });
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

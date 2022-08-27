import { precacheAndRoute } from 'workbox-precaching'
// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST)

'/index.html',
  '/js/main.js',
  'style.css',
  '/pages/fallback.html'
const CACHE_NAME = 'wishlist-cache-v1';

// Páginas HTML de la app
const urlsToCache = [
  'index.html',

  // Amparo
  'Amparo-Es-precis.html',
  'Amparo-Secundari.html',
  'Amparo-la-vida-que-me-merezco.html',

  // Manu
  'Manu-Es precís.html',
  'Manu-Secundari.html',
  'Manu-GAS.html',

  // Casa
  'Casa-Precís.html',
  'Casa-Secundari.html',
  'Casa-Top.html',

  // CSS
  'styles.css',

  // Imágenes del carousel
  'img/image1.jpg',
  'img/image2.jpg',
  'img/image3.jpg',
  'img/image4.jpg',
  'img/image5.jpg',
  'img/image6.jpg',
  'img/image7.jpg',
  'img/image8.jpg',
  'img/image9.jpg',

  // Iconos del manifest
  'https://via.placeholder.com/192',
  'https://via.placeholder.com/512'
];

// Instalación y cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// Activación y limpieza de caches antiguas
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch: servir desde cache o desde red si no está
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(() => {
        // fallback opcional
        if (event.request.destination === 'document') {
          return caches.match('index.html');
        }
      })
  );
});
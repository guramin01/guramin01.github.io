
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox){
    console.log(`Workbox berhasil untuk dimuat`);
    workbox.precaching.precacheAndRoute([
        { url: '/', revision: '2' },
        { url: '/nav.html', revision: '2' },
        { url: '/index.html', revision: '2' },
        { url: '/team.html', revision: '2' },
        { url: '/pages/home.html', revision: '2' },
        { url: '/pages/favorite.html', revision: '2' },
        { url: '/pages/schedule.html', revision: '2' },
        { url: '/css/materialize.min.css', revision: '2' },
        { url: '/css/custom.css', revision: '2' },
        { url: '/js/materialize.min.js', revision: '2' },
        { url: '/js/main.js', revision: '2' },
        { url: '/js/db.js', revision: '2' },
        { url: '/js/idb.js', revision: '2' },
        { url: '/js/det-team.js', revision: '2' },
        { url: '/js/content.js', revision: '2' },
        { url: '/js/regist.js', revision: '2' },
        { url: '/js/api.js', revision: '2' },
        { url: '/push.js', revision: '2' },
        { url: '/icon/rest-512.png', revision: '2' },
        { url: '/icon/rest-384.png', revision: '2' },
        { url: '/icon/rest-192.png', revision: '2' },
        { url: '/icon/rest-96.png', revision: '2' },
        { url: '/manifest.json', revision: '2' },
        ], {
          ignoreURLParametersMatching: [/.*/]
        });

    workbox.routing.registerRoute(
        /.*(?:png|gif|jpg|jpeg|svg|ico)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'gambar-cache',
            plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200]
            }),
            new workbox.expiration.Plugin({
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60,
            }),
            ]
        })
        );


    workbox.routing.registerRoute(
      /\.(?:js|css)$/,
      new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'resources',
      })
    );

    workbox.routing.registerRoute(
        new RegExp('https://api.football-data.org/v2'),
        workbox.strategies.staleWhileRevalidate()
        )

    workbox.routing.registerRoute(
      new RegExp('/pages/'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'pages'
        })
    );

}else{
  console.log(`Workbox gagal untuk dimuat`);
}

self.addEventListener('notificationclick', function (event) {
    console.log(event.action);

  if (!event.action) {
    // Penguna menyentuh area notifikasi diluar action
  event.notification.close();

    console.log('Notification Click.');
    return;
  }
  switch (event.action) {
    case 'yes-action':
      console.log('Pengguna memilih action yes.');
      // buka tab baru
      clients.openWindow('https://google.com');
  event.notification.close();

      break;
    case 'no-action':
      console.log('Pengguna memilih action no');
  event.notification.close();

      break;
    default:
      console.log(`Action yang dipilih tidak dikenal: '${event.action}'`);
      break;
  }
});

self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'img/notification.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});
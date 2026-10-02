self.addEventListener('push', (event) => {
  let data = { title: 'PENROL', body: "It's reading time!" };
  try { data = event.data.json(); } catch (e) {}
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/Penrol/icons/icon-192.png',
      badge: '/Penrol/icons/icon-192.png',
      tag: 'penrol-reading-time',
      renotify: true
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes('/Penrol/') && 'focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('/Penrol/');
    })
  );
});

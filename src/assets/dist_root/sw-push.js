// Service worker script to import push functionality for backend api

'use strict';

self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = 'Level Rewards';
  const options = {
    body: event.data.text(),
    icon: 'assets/png/lr-icon-v3.png',
    badge: 'assets/png/lr-icon-v3.png'
  };

  const notificationPromise = self.registration.showNotification(title, options);
  event.waitUntil(notificationPromise);
});

self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  event.waitUntil(
    clients.openWindow('https://developers.google.com/web/')
  );
});
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PushNotification, Permission } from '../models/push-notification';

declare const Notification: any;
// declare var ServiceWorkerRegistration: any;
import { log, PUSH_MANAGER_SUPPORT, SERVICE_WORKER_SUPPORT } from './constants';

@Injectable()
export class SWAndPushService {
  permission: Permission;
  swRegistration: any;

  constructor() {
    this.permission = this.isSupported() ? Notification.permission : 'denied';
  }

  requestPermission() {
    if ('Notification' in window)
      Notification.requestPermission((status: any) => (this.permission = status));
  }

  isSupported() {
    return 'Notification' in window;
  }

  create(push: PushNotification): Observable<any> {
    return new Observable((obs: any) => {
      if (!('Notification' in window)) {
        obs.error('Notifications are not available in this environment');
        obs.complete();
      }

      if (this.permission !== 'granted') {
        obs.error(`The user hasn't granted you permission to send push notifications`);
        obs.complete();
      }

      try {
        if (SERVICE_WORKER_SUPPORT && PUSH_MANAGER_SUPPORT && this.swRegistration) {
          log('SENDING PUSH THROUGH SERVICE WORKER');
          return this.swRegistration.showNotification(push.title, push.options);
        } else {
          log('SENDING PUSH THROUGH NOTIFICATION API');
          const n = new Notification(push.title, push.options);
          n.onshow = (e: any) => obs.next({ notification: n, event: e });
          n.onclick = (e: any) => obs.next({ notification: n, event: e });
          n.onerror = (e: any) => obs.error({ notification: n, event: e });
          n.onclose = () => obs.complete();
        }
      } catch (e) {
        log(e);
      }
    });
  }

  registerServiceWorkers(fileNames: string[]) {
    if (!('Notification' in window)) {
      return;
    }
    fileNames.forEach(name => {
      navigator.serviceWorker
        .register(name)
        .then(swReg => {
          log('Cache Service Worker is registered', swReg);
          this.swRegistration = swReg;
        })
        .catch(err => {
          console.error('Cache Service Worker Error', err);
        });
    });
  }

  unregisterServiceWorkers(fileNames: string[]) {
    if (!('Notification' in window)) {
      return;
    }
    navigator.serviceWorker
      .getRegistrations()
      .then(function(registrations) {
        for (let registration of registrations) {
          if (registration && registration.active && registration.active.scriptURL) {
            fileNames.forEach(name => {
              if (registration.active.scriptURL.includes(name)) {
                registration.unregister();
                console.log(`unregistering service worker "${name}"`);
              }
            });
          }
        }
      })
      .catch(err => {
        console.error('Unregister Service Worker Error', err);
      });
  }
}

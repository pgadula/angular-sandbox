import { NgZone } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

export const outsideZone =
  <T>(zone: NgZone) =>
  (source: Observable<T>) =>
    new Observable((observer) => {
      let subscription: Subscription;
      zone.runOutsideAngular(() => {
        subscription = source.subscribe(observer);
      });
      return subscription;
    });

import { fromEvent, map, merge, tap } from 'rxjs';

export type NetworkStatus = 'Online' | 'Offline';
export const networkStatus$ = merge(
  fromEvent(window, 'online'),
  fromEvent(window, 'offline')
).pipe(
  map(() => navigator.onLine),
);

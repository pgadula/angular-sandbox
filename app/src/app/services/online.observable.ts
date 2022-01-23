import { fromEvent, map, merge, tap } from 'rxjs';

export type NetworkStatus = 'Online' | 'Offline';

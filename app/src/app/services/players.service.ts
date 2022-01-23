import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Player } from '../models/player.models';
let errorCount = 0;
@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  private names = ['Bartek', 'Łukasz', "Basia", "Karol"];
  public loadUserE(): Observable<Player> {
    return throwError(() => {
      const error: any = new Error(`This is error number ${++errorCount}`);
      error.timestamp = Date.now();
      return error;
    });
  }

  public loadUser(): Observable<Player> {
    const rand = this.names[Math.floor(Math.random() * this.names.length)];
    return of<Player>({
      name: rand,
    });
  }

  constructor() {}
}

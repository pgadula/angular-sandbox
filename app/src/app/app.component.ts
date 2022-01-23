import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, tap } from 'rxjs';
import { GameComponent } from './game/game.component';
import { Player, ScoreHistory } from './models/player.models';
import { NetworkStatus } from './services/online.service';
import { startGame } from './store/actions/gameSettings.actions';
import {
  player1IncrementScore,
  player2IncrementScore,
} from './store/actions/players.actions';
import { selectNetworkStatus } from './store/selectors/gameSettings.selectors';
import {
  selectLastScoreHistory,
  selectPlayer1Score,
  selectPlayer2Score,
  selectPlayersRxjsOperators,
  selectPlayersWithOperators,
} from './store/selectors/players.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild(GameComponent) gameComponent: GameComponent;

  public scoreHistorySize = 10;
  public scoreHistory$: Observable<ScoreHistory[]>;
  public players$: Observable<{ player1: Player; player2: Player; }>;
  public isOnline$: Observable<boolean>;


  constructor(private readonly store: Store) {}
  ngOnInit(): void {
    this.players$ = this.store.pipe(selectPlayersWithOperators)
    this.isOnline$ = this.store.select(selectNetworkStatus).pipe(map(x=>x == "Online"))
    this.scoreHistory$ = this.store.pipe(
      selectLastScoreHistory(this.scoreHistorySize)
    );

    // this.store.select(selectPlayersRxjsOperators).pipe(tap(console.log)).subscribe()
  }
  public increaseScorePlayer1() {
    this.store.dispatch(player1IncrementScore());
  }
  public increaseScorePlayer2() {
    this.store.dispatch(player2IncrementScore());
  }
  public startGame(){
    this.store.dispatch(startGame())
  }
}

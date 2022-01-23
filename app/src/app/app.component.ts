import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { player1IncreaseScore, player2IncreaseScore } from './store/actions/players.actions';
import { selectPlayers1Score, selectPlayers2Score } from './store/selectors/players.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public score1$: Observable<number>
  public score2$: Observable<number>

  constructor(private readonly store: Store){
  }
  ngOnInit(): void {
    this.score1$ = this.store.select(selectPlayers1Score)
    this.score2$ = this.store.select(selectPlayers2Score)
  }
  public increaseScorePlayer1(){
    this.store.dispatch(player1IncreaseScore())
  }
  public increaseScorePlayer2(){
    this.store.dispatch(player2IncreaseScore())
  }

}

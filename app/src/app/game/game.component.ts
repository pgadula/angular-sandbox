import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import {
  player1IncrementScore,
  player2IncrementScore,
  resetScore,
} from '../store/actions/players.actions';
import {
  selectOnGameStart,
  selectOnGameStop,
} from '../store/selectors/gameSettings.selectors';
import {
  selectPlayer1Score,
  selectPlayer2Score,
} from '../store/selectors/players.selectors';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.svg',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, OnDestroy {
  // constants
  public ballWidth = 3;
  public ballHeight = 4;
  public racketWidth = 3;
  public racketHeight = 20;
  public racketMargin = 3;
  public racketSpeed = 3;

  public score0$: Observable<number>;
  public score1$: Observable<number>;
  racket0Y = 40;
  racket1Y = 40;
  racket0X = this.racketMargin;
  racket1X = 100 - this.racketMargin - this.racketWidth;
  ballX = -1 * this.ballWidth;
  ballY = -1 * this.ballHeight;
  canMoveBall = false;
  canMoveRackets = false;

  constructor(private readonly store: Store) {}

  ngOnInit() {
    this.score0$ = this.store.select(selectPlayer1Score);
    this.score1$ = this.store.select(selectPlayer2Score);
    this.store
      .pipe(selectOnGameStart)
      .pipe(tap(() => this.newGame()))
      .subscribe();

    this.store
      .pipe(selectOnGameStop)
      .pipe(tap(() => this.resetAll()))
      .subscribe();
  }

  ngOnDestroy() {}

  @HostListener('window:keydown', ['$event'])
  onKeyDown(e: any) {
    if (e.code === 'KeyW') {
      window.requestAnimationFrame(() => this.moveRacket0(-this.racketSpeed));
    }
    if (e.code === 'KeyS') {
      window.requestAnimationFrame(() => this.moveRacket0(this.racketSpeed));
    }
    if (e.code === 'ArrowUp') {
      window.requestAnimationFrame(() => this.moveRacket1(-this.racketSpeed));
    }
    if (e.code === 'ArrowDown') {
      window.requestAnimationFrame(() => this.moveRacket1(this.racketSpeed));
    }
  }

  resetAll(): void {
    this.store.dispatch(resetScore());
    this.canMoveBall = false;
    this.canMoveRackets = false;
    this.resetBallAndRackets();
  }

  resetBallAndRackets(): void {
    this.racket0Y = 40;
    this.racket1Y = 40;
    this.ballX = -1 * this.ballWidth;
    this.ballY = -1 * this.ballHeight;
    this.canMoveBall = false;
  }

  private newGame(): void {
    this.resetAll();
    this.startRound();
  }

  startRound(): void {
    this.setBall();
    const xIncrement = this.getRandomIncrement();
    const yIncrement = this.getRandomIncrement();
    this.canMoveBall = true;
    this.canMoveRackets = true;
    window.requestAnimationFrame(() => this.moveBall(xIncrement, yIncrement));
  }

  getRandomIncrement(): number {
    const isNegative = Math.floor(Math.random() * 2) === 1;
    return ((Math.floor(Math.random() * 3) + 3) * (isNegative ? -1 : 1)) / 10;
  }

  setBall(): void {
    this.ballX = 48.5;
    this.ballY = Math.floor(Math.random() * (100 - this.ballHeight + 1));
  }

  async moveBall(xIncrement: number, yIncrement: number): Promise<void> {
    if (!this.canMoveBall) {
      return;
    }
    this.ballX += xIncrement;
    this.ballY += yIncrement;

    if (this.isBallCollidedWithWalls()) {
      yIncrement *= -1;
    }

    if (this.isBallCollidedWithRacket0()) {
      xIncrement *= -1;
    } else if (this.isBallCollidedWithRacket1()) {
      xIncrement *= -1;
    }

    if (this.isPlayer0Scored()) {
      this.store.dispatch(player1IncrementScore());
      if (!this.isPlayer0Win(0) && !this.isPlayer1Win(0)) {
        await this.delay(1000);
        this.startRound();
      }
      return;
    } else if (this.isPlayer1Scored()) {
      this.store.dispatch(player2IncrementScore());

      if (!this.isPlayer0Win(0) && !this.isPlayer1Win(0)) {
        await this.delay(1000);
        this.startRound();
      }
      return;
    }
    window.requestAnimationFrame(() => this.moveBall(xIncrement, yIncrement));
  }

  moveRacket0(yIncrement: number): void {
    if (!this.canMoveRackets) {
      return;
    }
    let newY = this.racket0Y + yIncrement;
    newY = Math.min(newY, 100 - this.racketHeight);
    newY = Math.max(newY, 0);
    this.racket0Y = newY;
  }

  moveRacket1(yIncrement: number): void {
    if (!this.canMoveRackets) {
      return;
    }
    let newY = this.racket1Y + yIncrement;
    newY = Math.min(newY, 100 - this.racketHeight);
    newY = Math.max(newY, 0);
    this.racket1Y = newY;
  }

  applyCollisionWithRackets(xIncrement: number): number {
    if (
      this.ballX <= this.racketMargin + this.racketWidth ||
      this.ballX + this.ballWidth >= 100 - this.racketMargin - this.racketWidth
    ) {
      return -1 * xIncrement;
    } else {
      return xIncrement;
    }
  }

  isBallCollidedWithRacket0(): boolean {
    const racket0RightX = this.racket0X + this.racketWidth;
    const ballCenterY = this.ballY + this.ballHeight / 2;
    return (
      this.ballX <= racket0RightX &&
      this.ballX > this.racket0X &&
      ballCenterY >= this.racket0Y &&
      ballCenterY <= this.racket0Y + this.racketHeight
    );
  }

  isBallCollidedWithRacket1(): boolean {
    const ballRightX = this.ballX + this.ballWidth;
    const racket1RightX = this.racket1X + this.racketWidth;
    const ballCenterY = this.ballY + this.ballHeight / 2;
    return (
      ballRightX >= this.racket1X &&
      ballRightX < racket1RightX &&
      ballCenterY >= this.racket1Y &&
      ballCenterY <= this.racket1Y + this.racketHeight
    );
  }

  isBallCollidedWithWalls(): boolean {
    return this.ballY <= 0 || this.ballY + this.ballHeight >= 100;
  }

  isPlayer0Scored(): boolean {
    return this.ballX >= 100;
  }

  isPlayer1Scored(): boolean {
    return this.ballX + this.ballWidth <= 0;
  }

  isPlayer0Win(score: number): boolean {
    return score === 10;
  }

  isPlayer1Win(score: number): boolean {
    return score === 10;
  }

  delay(ms: number): Promise<void> {
    return new Promise((f) => setTimeout(f, ms));
  }
}

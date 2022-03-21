import { ChangeDetectionStrategy, Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'app-child3',
  templateUrl: './child3.component.html',
  styleUrls: ['./child3.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Child3Component implements DoCheck {
  public counter = 0;
  constructor() {}
  ngDoCheck(): void {
    this.counter = this.counter + 1;
  }
}

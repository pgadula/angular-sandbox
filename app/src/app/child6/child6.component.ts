import { ChangeDetectionStrategy, Component, DoCheck, OnInit } from '@angular/core';
import { ApplicationComponentDirective } from '../application-component.directive';

@Component({
  selector: 'app-child6',
  templateUrl: './child6.component.html',
  styleUrls: ['./child6.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Child6Component implements OnInit, DoCheck, ApplicationComponentDirective {
  public counter = 0;
  ngDoCheck(): void {
    this.counter = this.counter + 1;
  }

  ngOnInit(): void {}
}

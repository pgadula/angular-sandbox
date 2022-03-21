import { ChangeDetectionStrategy, Component, DoCheck, Input, OnInit } from '@angular/core';
import { interval, of } from 'rxjs';
import { ApplicationComponentDirective } from '../application-component.directive';

@Component({
  selector: 'app-child2',
  templateUrl: './child2.component.html',
  styleUrls: ['./child2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Child2Component implements OnInit, DoCheck, ApplicationComponentDirective {
  @Input() obj
  public counter = 0;
  constructor() { }
  ngDoCheck(): void {
    this.counter = this.counter + 1
  }

  ngOnInit(): void {
  }

}

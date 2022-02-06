import { ChangeDetectionStrategy, Component, DoCheck, OnInit } from '@angular/core';
import { interval, of } from 'rxjs';

@Component({
  selector: 'app-child1',
  templateUrl: './child1.component.html',
  styleUrls: ['./child1.component.scss'],
  
})
export class Child1Component implements OnInit, DoCheck {
  public counter = 0;
  constructor() { }
  ngDoCheck(): void {
    this.counter = this.counter + 1
  }

  ngOnInit(): void {
  }

}

import { Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'app-child6',
  templateUrl: './child6.component.html',
  styleUrls: ['./child6.component.scss'],
})
export class Child6Component implements OnInit, DoCheck {
  public counter = 0;
  ngDoCheck(): void {
    this.counter = this.counter + 1;
  }

  ngOnInit(): void {}
}

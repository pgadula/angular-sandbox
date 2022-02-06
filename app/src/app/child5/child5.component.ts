import { Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'app-child5',
  templateUrl: './child5.component.html',
  styleUrls: ['./child5.component.scss']
})
export class Child5Component implements OnInit, DoCheck {
  public counter = 0;
  ngDoCheck(): void {
    this.counter = this.counter + 1
  }

  ngOnInit(): void {
  }

}

import { ChangeDetectionStrategy, Component, DoCheck, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, interval, mergeMap, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-child4',
  templateUrl: './child4.component.html',
  styleUrls: ['./child4.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Child4Component implements DoCheck, OnInit {
  public stream$;
  public counter = 0;
  public control: FormControl = new FormControl(false);
  constructor() {}
  ngOnInit(): void {
    this.stream$ = this.control.valueChanges.pipe(
      filter((x) => x == true),
      mergeMap((x) => interval(1000).pipe(takeUntil(this.control.valueChanges)))
    )
  }
  ngDoCheck(): void {
    this.counter = this.counter + 1;
  }
}

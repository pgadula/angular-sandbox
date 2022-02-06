import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, DoCheck {
  public counter: number = 0;
  public control = new FormControl('test');
  public obj = { name: 'test' };
  ngDoCheck(): void {
    this.counter = this.counter + 1;
  }
  ngOnInit(): void {
    this.control.valueChanges.subscribe((newName) => (this.obj.name = newName));
  }
}

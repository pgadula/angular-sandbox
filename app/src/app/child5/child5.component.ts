import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { ApplicationComponentDirective } from '../application-component.directive';
import { outsideZone } from '../operators/outsideZone';

@Component({
  selector: 'app-child5',
  templateUrl: './child5.component.html',
  styleUrls: ['./child5.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Child5Component implements OnInit, DoCheck, ApplicationComponentDirective, AfterViewInit {
  @ViewChild('scrollable') el: ElementRef;
    public counter = 0;
  constructor(private zone: NgZone){

  }
  ngAfterViewInit(): void {
    // this.zone.runOutsideAngular(()=>{
    //   this.el.nativeElement.addEventListener('scroll', ()=>console.log('scroll'))

    // })



    // fromEvent(this.el.nativeElement, 'scroll').pipe(outsideZone(this.zone)).subscribe(x=>console.log('scroll'))

  }
  ngDoCheck(): void {
    this.counter = this.counter + 1
  }

  ngOnInit(): void {
  }
  public fn():void{

  }
  

}

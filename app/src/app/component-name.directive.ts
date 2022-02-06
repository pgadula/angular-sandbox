import { Directive, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[appComponentName]'
})
export class ComponentNameDirective implements OnInit {

  constructor(private viewContainerRef: ViewContainerRef) {}
  public ngOnInit(): void {
    const name  = this.viewContainerRef['_view'].component.constructor.name;
    console.log(name)
  }

}

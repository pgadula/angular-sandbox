import {
  Directive,
  DoCheck,
  ElementRef,
  NgZone,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective implements DoCheck {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private ngZone: NgZone
  ) {}

  ngDoCheck(): void {
    
    this.renderer.addClass(this.el.nativeElement, 'highlight');
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.renderer.removeClass(this.el.nativeElement, 'highlight');
      }, 50);
    });
  }
}

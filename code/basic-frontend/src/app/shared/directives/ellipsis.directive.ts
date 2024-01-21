import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appEllipsis]'
})
export class EllipsisDirective implements AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    const container = this.el.nativeElement;
    const content = container.innerHTML;
    if (container.scrollWidth > container.clientWidth) {
      this.renderer.setAttribute(container, 'title', content);
      this.renderer.setStyle(container, 'white-space', 'nowrap');
      this.renderer.setStyle(container, 'overflow', 'hidden');
      this.renderer.setStyle(container, 'max-width', '21rem');
      this.renderer.setStyle(container, 'text-overflow', 'ellipsis');
    }
  }
}
// use in template
// <div appEllipsis>
  // This is a long text that will be truncated with an ellipsis if it overflows its container.
  // </div>
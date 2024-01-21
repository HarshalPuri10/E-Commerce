import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appSideNavHover]',
})
export class SideNavHoverDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
  defaultColor: string = '#ffffff';
  ngOnInit() {
    // this.color = this.defaultColor;
  }

  @Input() color: string = '#ffffff';

  // @HostBinding('style.color') color: string = this.defaultColor;

  @HostListener('mouseenter') mouseover() {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'background-color',
      this.getBackgroundColor(this.color)
    );
  }

  @HostListener('mouseleave') mouseleave() {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'background-color',
      this.getBackgroundColor(this.defaultColor)
    );
  }

  getBackgroundColor(color: string) {
    var hex = color.replace('#', '');
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    var r = parseInt(hex.substring(0, 2), 16),
      g = parseInt(hex.substring(2, 4), 16),
      b = parseInt(hex.substring(4, 6), 16);
    color = 'rgba(' + r + ',' + g + ',' + b + ',0.1)';
    return color;
  }
}

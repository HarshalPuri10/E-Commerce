import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';
@Directive({
  selector: '[formControlName][appTwoDigitDecimalNumber]',
})
export class TwoDigitDecimalNumberDirective {
  myTimeout: any;
  private regex: RegExp = new RegExp(/^\d*\.?\d{0,2}$/g);
  private specialKeys: Array<string> = [
    'Backspace',
    'Tab',
    'End',
    'Home',
    '-',
    'ArrowLeft',
    'ArrowRight',
    'Del',
    'Delete',
  ];
  constructor(private el: ElementRef, public ngControl: NgControl) {}
  @HostListener('keyup', ['$event'])
  onModelChange(event: any) {
    clearTimeout(this.myTimeout);
    this.onInputChange(event);
  }
  // @HostListener('keydown', ['$event'])
  // onKeyDown(event: KeyboardEvent) {
  //   this.onInputChange(event);
  // }
  // @HostListener('keydown.backspace', ['$event'])
  // keydownBackspace(event: any) {
  //   this.onInputChange(event);
  // }
  onInputChange(event: any) {
    // Allow Backspace, tab, end, and home keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    let current: string = this.el.nativeElement.value;

    this.myTimeout = setTimeout(() => {
      this.ngControl?.valueAccessor?.writeValue(Number(current).toFixed(2));
    }, 1000);
  }
}

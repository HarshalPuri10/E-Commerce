import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appHighlightSearch]'
})
export class HighlightSearchDirective implements OnChanges {
  @Input() searchQuery: string='';

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    if (this.searchQuery && this.searchQuery.length > 0) {
      const text = this.el.nativeElement.innerText;
      const regex = new RegExp(`(${this.escapeRegExp(this.searchQuery)})`, 'gi');
      const highlightedText = text.replace(regex, '<mark>$1</mark>');
      this.el.nativeElement.innerHTML = highlightedText;
    }
  }

  private escapeRegExp(query: string): string {
    return query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }
}

// use html
// <p [appHighlightSearch]="searchQuery">
//   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quisquam iste, qui ex ea voluptate velit
// </p>
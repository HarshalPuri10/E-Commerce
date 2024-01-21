import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFi1ter',
})
export class SearchFilterPipe implements PipeTransform {
  transform(items: any[], searchText: any): any[] {
    // if (typeof searchText == 'number') {
    //   searchText = searchText.toString();
    // }
    if (!items) return [];
    if (
      typeof searchText == 'undefined' ||
      typeof searchText == 'object' ||
      searchText == ''
    ) {
      return items;
    }
    searchText = searchText.toString();
    return items.filter((element: any) => {
      return JSON.stringify(element)
        .toLowerCase()
        .includes(searchText.toLowerCase());
    });
  }
}

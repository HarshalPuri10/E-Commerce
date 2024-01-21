import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss']
})
export class CustomTableComponent implements OnInit {
  sort: any = null

  @Input() tableData: any = [];
  @Input() header: any = [];
  @Input() action: any = [];
  @Output() customTableEvent = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  sortBy(i: number) {
    
    
    if (!this.sort) {
      this.sort = 'ASC';
    } else if (this.sort == 'ASC') {
      this.sort = 'DESC';
    } else {
      this.sort = null;
    }
    let sortObj = {
      sort: this.sort,
      index: i
    }
    this.customTableEvent.emit({ value: sortObj, key: 'SORT' })
  }

  // edit(index:number){
  //   this.customTableEvent.emit({ value: index, key: 'EDIT' })
  // }

  // view(index:number){
  //   this.customTableEvent.emit({ value: index, key: 'VIEW' })
  // }
  
  actions(dataIndex:number,actionIndex:number){
    let actionObj={
      dataIndex:dataIndex,
      action:this.action[actionIndex].value
    }
    this.customTableEvent.emit({ value: actionObj, key: 'ACTION' })
  }

}

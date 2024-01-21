import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

@Component({
    selector: "appTabCard",
    templateUrl: "./tab-card.component.html"
})
export class TabCardComponent implements OnInit {
    // @Input() cards: any = [];
    // @Input() noOfCards: number = 3;
    // @Input() cardClass: string = 'txnCard';
    @Input() data: {cards: any; noOfCards: number; cardClass: string} | any = {};

    @Output() dataChange = new EventEmitter<any>();
    constructor() {}

    ngOnInit() {}
    navigateTo(card: object) {
        this.dataChange.emit(card);
    }
}

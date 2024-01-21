import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgSelectModule} from "@ng-select/ng-select";
import {
    AlertComponent,
    CustomMenuHeaderComponent,
    ValidationMessagesComponent,
    CustomTableComponent,
    FileUploadComponent,
    TabCardComponent
} from "../core/components";

import {
    NgbdSortableHeader,
    TwoDigitDecimalNumberDirective,
    EllipsisDirective,
    HighlightSearchDirective,
    TimeAgoDirective,
    CopyToClipboardDirective,
    LazyLoadImageDirective
} from "./directives";

import {SearchFilterPipe, TruncatePipe, ToWordsPipe, CompanyCurrencyPipe} from "./pipes";
import {CarouselModule} from "ngx-bootstrap/carousel";

const COMPONENTS: any = [
    AlertComponent,
    ValidationMessagesComponent,
    CustomMenuHeaderComponent,
    FileUploadComponent,
    CustomTableComponent,
    TabCardComponent
];
const PIPES: any = [SearchFilterPipe, TruncatePipe, ToWordsPipe, CompanyCurrencyPipe];
const DIRECTIVES: any = [NgbdSortableHeader, TwoDigitDecimalNumberDirective, LazyLoadImageDirective];
const MODULES: any = [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    CarouselModule.forRoot()
];
@NgModule({
    declarations: [
        ...COMPONENTS,
        ...DIRECTIVES,
        ...PIPES,
        EllipsisDirective,
        HighlightSearchDirective,
        TimeAgoDirective,
        CopyToClipboardDirective
    ],
    imports: [...MODULES],
    exports: [...COMPONENTS, ...MODULES, ...DIRECTIVES, ...PIPES]
})
export class SharedModule {}

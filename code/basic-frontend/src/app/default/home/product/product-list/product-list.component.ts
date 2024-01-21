import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from "@angular/core";
import {Router} from "@angular/router";
import {SpinnerService, ToastService} from "@core/services";
import {ProductService} from "@services/sales";
import {NgbdSortableHeader, SortEvent} from "@shared/directives";
import {Subject, debounceTime, distinctUntilChanged} from "rxjs";

@Component({
    selector: "app-product-list",
    templateUrl: "./product-list.component.html",
    styleUrls: ["./product-list.component.scss"]
})
export class ProductListComponent implements OnInit, AfterViewInit {
    @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader> | any;
    @ViewChild("myLink") myLink!: ElementRef;
    page: number = 1;
    pageSize: number = 5;
    collection: number = 0;
    column: string = "name";
    direction: number = -1;
    search: string = "";
    tableData: any = [];
    search$ = new Subject<string>();
    constructor(
        private toastService: ToastService,
        private spinner: SpinnerService,
        private router: Router,
        private productService: ProductService
    ) {}
    ngOnInit(): void {
        this.search$.pipe(debounceTime(600), distinctUntilChanged()).subscribe(value => {
            this.commonChange("SEARCH", value);
        });
        this.getAll();
    }
    ngAfterViewInit() {
        if (this.myLink && this.myLink.nativeElement) {
            this.myLink.nativeElement.addEventListener("click", (event: Event) => {
                event.preventDefault();
                console.log("Button clicked!");
                // Additional actions you want to perform on button click
            });
        }
    }
    commonChange(key: string, value: any) {
        if (key == "PAGE") {
            this.page = value;
            this.getAll();
        } else if (key == "SEARCH") {
            this.search = value;
            this.getAll();
        }
    }
    getAll() {
        this.spinner.show();
        let payload = {
            page: this.page,
            pageSize: this.pageSize,
            search: this.search,
            column: this.column,
            direction: this.direction
        };
        this.productService.getAll(payload).subscribe(success => {
            this.tableData = success.rows;
            this.collection = success.count;
            this.spinner.hide();
        });
    }
    onSort({column, direction}: SortEvent) {
        this.headers.forEach((header: any) => {
            if (header.sortable !== column) {
                header.direction = "";
            }
        });
        this.column = column;
        this.direction = direction == "asc" ? 1 : -1;
        this.getAll();
    }
    trackByFn(index: number, item: any) {
        return item?._id;
    }
    navigateTo(path: string, u: any, action: string) {
        this.router.navigate([path], {queryParams: {id: u?._id, action}});
        return;
    }
}

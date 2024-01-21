import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {SpinnerService, StorageService, ToastService} from "@core/services";
import {ProductService} from "@services/sales";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
    tableData: any = [];
    collection: number = 0;
    constructor(
        private spinner: SpinnerService,
        private productService: ProductService,
        private router: Router,
        private toasterService: ToastService,
    ) {}
    ngOnInit(): void {
        this.getAll();
    }

    getAll() {
        this.spinner.show();
        this.productService.getAllHome({}).subscribe(success => {
            this.tableData = success.rows;
            this.collection = success.count;
            this.spinner.hide();
        });
    }
    // navigateTo(path: string, id: any) {
    //     this.router.navigate([path], {queryParams: {id: id}});
    //     return;
    // }
    addToCart(id: string) {
        this.productService.update(id, {addToCart: true}).subscribe((success: any) => {
            if (success) {
                this.getAll();
                this.toasterService.success("Added to Cart Successfully");
            }
        });
    }
    trackByFn(index: number, slide: any): any {
        return index;
    }
}

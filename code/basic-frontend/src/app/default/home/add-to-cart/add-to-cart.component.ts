import {Component, OnInit} from "@angular/core";
import {SpinnerService} from "@core/services";
import {ProductService} from "@services/sales";

@Component({
    selector: "app-add-to-cart",
    templateUrl: "./add-to-cart.component.html",
    styleUrls: ["./add-to-cart.component.scss"]
})
export class AddToCartComponent implements OnInit {
    constructor(private productService: ProductService, private spinner: SpinnerService) {}
    tableData: any = [];
    subTotal: number = 0;
    grandTotal: number = 0;
    tax: number = 0;
    lineValue: number = 0;
    freeShip: Boolean = true;
    ngOnInit(): void {
        this.getAll();
    }

    getAll() {
        this.spinner.show();
        this.productService.getAllProductsAddToCart({}).subscribe(success => {
            this.spinner.hide();
            this.tableData = success;
            this.tableData.map((x: any) => {
                x.lineValue = 0;
                x.addQty = 0;
                return x;
            });
        });
    }

    changeLineValue(item: any) {
        item.lineValue = item.price * item.addQty;
        this.subTotal = this.tableData.reduce((total: any, table: any) => total + table.lineValue, 0);
        this.tax = (this.subTotal * 5) / 100;
        this.checkShipping();
        this.grandTotal = this.subTotal + this.tax;
        if (!this.freeShip) {
            this.grandTotal = this.subTotal + this.tax + 50;
        }
    }

    checkShipping() {
        if (!this.tableData.every((ele: any) => ele.freeShipping)) {
            this.freeShip = false;
        }
    }

    remove(id: any) {
        this.productService.update(id, {addToCart: false}).subscribe((success: any) => {
            if (success) {
                this.getAll();
            }
        });
    }
}

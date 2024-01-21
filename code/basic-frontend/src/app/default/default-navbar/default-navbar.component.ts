import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {StorageService} from "@core/services";
import {ProductService} from "@services/sales";
import {SharedService} from "@services/settings/shared.service";

@Component({
    selector: "app-default-navbar",
    templateUrl: "./default-navbar.component.html",
    styleUrls: ["./default-navbar.component.scss"]
})
export class DefaultNavbarComponent implements OnInit {
    addToCartCount: number = 0;
    user: any = {};
    constructor(
        private productService: ProductService,
        private router: Router,
        private sharedService: SharedService,
        private storageService: StorageService
    ) {}
    ngOnInit(): void {
        this.sharedService.data$.subscribe(data => {
            this.getAll();
        });
        this.getAll();
        this.user = this.storageService.get("user");
    }

    getAll() {
        this.productService.getAllProductsAddToCartCount({}).subscribe(success => {
            console.log("success.counts", success.counts);

            this.addToCartCount = success.counts;
        });
    }

    navigateTo(path: string) {
        this.router.navigate([path]);
        return;
    }
}

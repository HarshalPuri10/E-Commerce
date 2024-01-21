import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {SpinnerService, ToastService} from "@core/services";
import {CURRENCY} from "@mocks/constant";
import {ProductService} from "@services/sales";
import {Observable, mergeMap, of} from "rxjs";

@Component({
    selector: "app-product-form",
    templateUrl: "./product-form.component.html",
    styleUrls: ["./product-form.component.scss"]
})
export class ProductFormComponent implements OnInit {
    imagesArr: any = [];
    currencyList: any = CURRENCY;
    action: string = "create";
    constructor(
        private spinner: SpinnerService,
        private toastService: ToastService,
        private productService: ProductService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {}
    ngOnInit(): void {
        this.getInitialData();
    }
    form = new FormGroup({
        _id: new FormControl(null),
        name: new FormControl(null),
        category: new FormControl(null),
        description: new FormControl(null),
        price: new FormControl(null),
        currency: new FormControl(null),
        freeShipping: new FormControl(null),
        addToCart: new FormControl(false),
        isActive: new FormControl(true)
    });

    getInitialData() {
        this.spinner.show();
        this.activatedRoute.queryParams
            .pipe(
                mergeMap((params: any) => {
                    this.action = params.action;
                    if (!!!this.action) {
                        this.toastService.warning("You do not have access", "Access denied");
                        this.router.navigate(["./default/supports/access_denied"]);
                    }
                    if (params["id"]) {
                        return this.productService.getById(params["id"]);
                    } else {
                        return of({});
                    }
                })
            )
            .subscribe((success: any) => {
                this.spinner.hide();
                if (Object.keys(success).length == 0) {
                    return;
                }
                this.form.patchValue(success);
                if (this.action != "edit") {
                    this.form.disable();
                }
            });
    }
    submit() {
        let formData: any = this.form.value;
        let productFormData = new FormData();
        productFormData.append("key", "images");
        for (let i = 0; i < Object.keys(formData).length; i++) {
            const key = Object.keys(formData)[i];
            if ((formData[key] || formData[key] == false) && typeof formData[key] == "object") {
                if (formData[key] || formData[key] == false) {
                    productFormData.append(key, JSON.stringify(formData[key]));
                }
            } else {
                if (formData[key] || formData[key] == false) {
                    productFormData.append(key, formData[key]);
                }
            }
        }
        for (let i = 0; i < this.imagesArr.length; i++) {
            const imageFile = this.imagesArr[i];
            if (imageFile instanceof File) {
                productFormData.append("images", imageFile, imageFile.name);
            }
        }

        if (formData._id) {
            this.update(formData._id, productFormData);
        } else {
            delete formData._id;
            this.create(productFormData);
        }
    }
    selectFiles(event: any) {
        if (event.target.files && event.target.files[0]) {
            this.imagesArr = Array.from(event.target.files);
        }
    }
    create(formData: any) {
        this.spinner.show();
        this.productService.create(formData).subscribe(success => {
            this.spinner.hide();
            this.toastService.success(success.message);
            this.router.navigate(["/default/home/product-list"]);
        });
    }

    update(_id: string, formData: any) {
        this.spinner.show();
        this.productService.update(_id, formData).subscribe(success => {
            this.spinner.hide();
            this.toastService.success(success.message);
            this.router.navigate(["/default/home/product-list"]);
        });
    }

    reset() {
        this.form.reset();
    }
}

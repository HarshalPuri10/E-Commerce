import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {HomeRoutingModule} from "./home-routing.module";
import {HomeComponent} from "./home.component";
import {SharedModule} from "@shared/shared.module";
import {ProductListComponent} from "./product/product-list/product-list.component";
import {ProductFormComponent} from "./product/product-form/product-form.component";
import {AddToCartComponent} from "./add-to-cart/add-to-cart.component";

@NgModule({
    declarations: [HomeComponent, ProductListComponent, ProductFormComponent, AddToCartComponent],
    imports: [CommonModule, HomeRoutingModule, SharedModule]
})
export class HomeModule {}

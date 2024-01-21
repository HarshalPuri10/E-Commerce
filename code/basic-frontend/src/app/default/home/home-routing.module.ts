import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home.component";
import {ProductListComponent} from "./product/product-list/product-list.component";
import {ProductFormComponent} from "./product/product-form/product-form.component";
import {AddToCartComponent} from "./add-to-cart/add-to-cart.component";

const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "product-list", component: ProductListComponent},
    {path: "product-form", component: ProductFormComponent},
    {path: "add-to-cart", component: AddToCartComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {}

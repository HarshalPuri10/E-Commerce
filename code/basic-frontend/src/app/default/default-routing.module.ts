import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DefaultComponent} from "./default.component";
import {HomeModule} from "./home/home.module";
const routes: Routes = [
    {
        path: "",
        component: DefaultComponent,
        children: [
            {path: "", redirectTo: "login", pathMatch: "full"},
            {path: "home", loadChildren: () => import("./home/home-routing.module").then(m => m.HomeRoutingModule)}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DefaultRoutingModule {}

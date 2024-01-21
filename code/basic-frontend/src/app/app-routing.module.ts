import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
    {path: "", redirectTo: "auth", pathMatch: "full"},
    {
        path: "auth",
        loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
    },
    {
        path: "default",
        loadChildren: () => import("./default/default.module").then(m => m.DefaultModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}

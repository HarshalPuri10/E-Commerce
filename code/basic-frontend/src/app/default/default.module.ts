import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {DefaultComponent} from "./default.component";
import {DefaultRoutingModule} from "./default-routing.module";
import {DefaultNavbarComponent} from "./default-navbar/default-navbar.component";

@NgModule({
    declarations: [DefaultComponent, DefaultNavbarComponent],
    imports: [CommonModule, DefaultRoutingModule]
})
export class DefaultModule {}

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {AuthRoutingModule} from "./auth-routing.module";
import {AuthComponent} from "./auth.component";
import {LoginComponent} from "./screens/login/login.component";
import {RegisterComponent} from "./screens/register/register.component";
import {SharedModule} from "../shared/shared.module";
import {ForgetComponent} from "./screens/forget/forget.component";
import {NavbarComponent} from "./screens/navbar/navbar.component";

@NgModule({
    declarations: [AuthComponent, LoginComponent, RegisterComponent, ForgetComponent, NavbarComponent],
    imports: [CommonModule, AuthRoutingModule, SharedModule]
})
export class AuthModule {}

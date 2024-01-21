import {NgModule, ModuleWithProviders} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {JwtInterceptorProvider, ErrorInterceptorProvider, ApiPrefixInterceptorProvider} from "./helpers/index";
import {AlertService, ValidationService} from "./components";
import {NgxSpinnerModule} from "ngx-spinner";

@NgModule({
    imports: [HttpClientModule, NgxSpinnerModule],
    declarations: [],
    exports: [NgxSpinnerModule]
})
export class CoreModule {
    static forRoot(): ModuleWithProviders<CoreModule> {
        return {
            ngModule: CoreModule,
            providers: [
                AlertService,
                ValidationService,
                ApiPrefixInterceptorProvider,
                JwtInterceptorProvider,
                ErrorInterceptorProvider
            ]
        };
    }
}

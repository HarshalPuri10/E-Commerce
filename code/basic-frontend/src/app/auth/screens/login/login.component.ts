import {AfterViewInit, Component, OnInit} from "@angular/core";
import {UntypedFormGroup, UntypedFormControl, Validators} from "@angular/forms";
import {UserService} from "@services/settings";
import {ActivatedRoute, Router} from "@angular/router";
import {SpinnerService, StorageService, ToastService} from "@core/services";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit, AfterViewInit {
    returnUrl: string = "";
    isLoading: boolean = false;
    form = new UntypedFormGroup({
        email: new UntypedFormControl("", [Validators.required]),
        password: new UntypedFormControl("", [Validators.required])
    });
    get f() {
        return this.form.controls;
    }

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private toastService: ToastService,
        private spinner: SpinnerService,
        private storageService: StorageService
    ) {}

    ngAfterViewInit() {
        setTimeout(() => {
            this.isLoading = true;
        }, 2000);
    }

    ngOnInit(): void {
        this.storageService.remove("user");
        this.returnUrl = this.route.snapshot.queryParams[`returnUrl`] || "/default";
    }
    login() {
        this.spinner.show();
        this.userService.login(this.form.value).subscribe((success: any) => {
            this.storageService.set("user", success);
            this.router.navigate(["/default/home"]);
            this.toastService.success(success?.message);
        });
        this.spinner.hide();
    }
}

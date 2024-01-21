import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {SpinnerService, ToastService} from "@core/services";
import {UserService} from "@services/settings";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html"
})
export class RegisterComponent implements OnInit {
    constructor(
        private router: Router,
        private userService: UserService,
        private toastService: ToastService,
        private spinner: SpinnerService
    ) {}

    ngOnInit(): void {}

    repeatPassword: string = "";
    form = new FormGroup({
        name: new FormControl(null),
        email: new FormControl(null),
        password: new FormControl(null),
        isActive: new FormControl(true)
    });

    register() {
        let formData = this.form.value;
        if (this.checkPassword(formData)) {
            this.spinner.show();
            this.userService.create(formData).subscribe(success => {
                this.toastService.success(success.message);
                this.router.navigate(["/auth/login"]);
            });
            this.spinner.hide();
        }
    }

    checkPassword(formData: any) {
        if (formData.password != this.repeatPassword) {
            this.toastService.warning("Password Not Matching");
            return false;
        } else {
            return true;
        }
    }
}

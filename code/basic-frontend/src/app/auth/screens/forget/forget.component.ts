import { Component, OnInit } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { SpinnerService, ToastService } from '@core/services';
import { UserService } from '@services/settings';
@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.scss'],
})
export class ForgetComponent implements OnInit {
  form = new UntypedFormGroup({
    email: new UntypedFormControl('', [Validators.required]),
  });
  constructor(
    private userService: UserService,
    private toastService: ToastService,
    private spinner: SpinnerService
  ) {}

  ngOnInit(): void {}
  forget() {
    this.spinner.show();
    this.userService.forgetpass(this.form.value).subscribe((success) => {
      this.toastService.success('Enter new password !!');
      this.spinner.hide();
    });
  }
}

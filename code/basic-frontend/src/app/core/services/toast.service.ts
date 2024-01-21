import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastService: ToastrService) {}

  success(msg: string, title?: string): void {
    this.toastService.success(msg, title);
  }
  warning(msg: string, title?: string): void {
    this.toastService.warning(msg, title);
  }
  error(msg: string, title?: string): void {
    this.toastService.error(msg, title);
  }
  info(msg: string, title?: string): void {
    this.toastService.info(msg, title);
  }
}

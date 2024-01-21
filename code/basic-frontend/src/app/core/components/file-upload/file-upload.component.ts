import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastService } from '@core/services';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
})
export class FileUploadComponent implements OnInit {
  type = 'create';
  @Input() label: any = 'Upload';
  @Input() fileName: any = '';
  @Input() url: any = null;
  @Input() file: any = null;
  @Output() fileChange = new EventEmitter<any>();
  prepend = '';
  uploadFile = false;
  fileSuccessUpload: boolean = false;

  constructor(
    private toastService: ToastService,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {}
  fileChosen(event: any) {
    if (event.target.files.length) {
      if (event.target.files[0].size > 1000000) {
        this.toastService.warning(
          'Unable to upload file of size more than 1MB'
        );
        return;
      }
      this.file = <File>event.target.files[0];
      this.fileChange.emit(this.file);
      this.fileName = this.file.name;
      const type = this.file.type;
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        let base64: any = reader.result;
        this.url = this.domSanitizer.bypassSecurityTrustUrl(base64);
      };
      reader.onerror = (error) => {
        console.error(error);
      };
    }
  }
  saveFile(e: any) {
    let newName = this.prepend + '_' + e.target.files[0].name;
    this.file = e.target.files[0];
    this.fileName = newName;
    this.uploadFile = true;
    this.fileSuccessUpload = true;
  }
}

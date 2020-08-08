import { FormGroup } from '@angular/forms';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  Input,
} from "@angular/core";
import { FileUploadService } from "../../services/file-upload.service";
import { UploadResponse } from "../../entity/colare/UploadResponse";
import { FormControl } from '@angular/forms';

@Component({
  selector: "app-file-upload",
  templateUrl: "./file-upload.component.html",
  styleUrls: ["./file-upload.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadComponent implements OnInit {
  @Input() extensions;
  @Input() formGroup:FormGroup
  @Input() title: Text

  //@Output() fileUpload = new EventEmitter<string>();

  @ViewChild("file") _file: ElementRef;

  constructor(private fileUploadService: FileUploadService) {}

  ngOnInit(): void {}

  onFileChange(file: FileList) {
    this.fileUploadService.uploadColare(file[0]).subscribe(
      (response:UploadResponse) => {
        //this.fileUpload.emit(response.arquivo);
        this.formGroup.patchValue({"idDocumentoPDF":response.arquivo})
        //fc.patchValue(response.arquivo)        
      }
    );
    this._file.nativeElement.value = null;
  }
}

import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  Input
} from "@angular/core";
import { FileUploadService } from "../../services/file-upload.service";
import { UploadResponse } from "../../entity/UploadResponse";
import { AlertService } from "../../services/alert.service";

@Component({
  selector: "app-file-upload",
  templateUrl: "./file-upload.component.html",
  styleUrls: ["./file-upload.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploadComponent implements OnInit {

  @Input() 
  extensions;

  @Output() fileUpload = new EventEmitter<string>();

  @ViewChild("file") _file: ElementRef;

  constructor(
    private fileUploadService: FileUploadService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {}

  onFileChange(file: FileList) {
    this.fileUploadService.upload(file).subscribe(
      response => {
        this.fileUpload.emit((<UploadResponse>response).arquivo);
      },
      e => {
        this._file.nativeElement.value = null
        this.alertService.showAlertDanger(e.error.message,"Erro ao enviar o arquivo")
      }
    );
  }
}

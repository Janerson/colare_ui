import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { constructor } from 'moment';

@Component({
  selector: "app-file-upload",
  templateUrl: "./file-upload.component.html",
  styleUrls: ["./file-upload.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploadComponent implements OnInit {
  
  @Output() fileUpload = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onFileChange(file : FileList) {
    this.fileUpload.emit(file.item(0).name)
  }
}

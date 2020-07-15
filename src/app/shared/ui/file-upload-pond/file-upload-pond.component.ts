import { environment } from "./../../../../environments/environment.prod";
import {
  Component,
  OnInit,
  ViewChild,
  Input,
  EventEmitter,
  Output,
} from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { UploadResponse } from "../../entity/UploadResponse";
import { emit } from "cluster";

@Component({
  selector: "app-filepond",
  templateUrl: "./file-upload-pond.component.html",
  styleUrls: ["./file-upload-pond.component.css"],
})
export class FileUploadPondComponent implements OnInit {
  @Input() fileAccept: Text;
  @Output() onFileUpload = new EventEmitter<string>();

  constructor(private cookieService: CookieService) {}

  ngOnInit(): void {
    this.pondOptions.acceptedFileTypes = this.fileAccept;
  }

  @ViewChild("myPond") myPond: any;

  serverOpt = {
    process: (
      fieldName,
      file,
      metadata,
      load,
      error,
      progress,
      abort,
      transfer,
      options
    ) => {
      const formData = new FormData();
      formData.append(fieldName, file, file.name);

      const request = new XMLHttpRequest();
      request.open("POST", environment.URL_UPLOAD);
      request.setRequestHeader(
        "Authorization",
        this.cookieService.get("TCM_TOKEN")
      );

      request.upload.onprogress = (e) => {
        progress(e.lengthComputable, e.loaded, e.total);
      };
      const emitir = (response) =>{
        this.onFileUpload.emit((<UploadResponse>response).arquivo);
      };
      request.onload = function () {
        if (request.status >= 200 && request.status < 300) {
          emitir(JSON.parse(request.response))
          load(request.response);
        } else {
          error("oh no");
        }
      };

      request.send(formData);

      return {
        abort: () => {
          request.abort();
          abort();
        },
      };
    },
  };

  pondOptions = {
    multiple: false,
    acceptedFileTypes: this.fileAccept,
    instantUpload: true,
    allowFileSizeValidation: true,
    maxFileSize: "5MB",
    labelIdle:
      '<span class="filepond--label-action">Clique para selecionar</span> ou solte o arquivo aqui.',
    labelMaxFileSizeExceeded: "Arquivo muito grande",
    labelMaxFileSize: "Tamanho máximo do arquivo é {filesize}",
    server: this.serverOpt,
    labelButtonDownloadItem: "Download", // by default 'Download file'
    allowDownloadByUrl: false, // by default downloading by URL disabled
  };  
}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormDebugComponent } from "./componente/form-debug/form-debug.component";
import { NgxJsonViewerModule } from "ngx-json-viewer";

@NgModule({
  declarations: [FormDebugComponent],
  imports: [CommonModule, NgxJsonViewerModule],
  exports: [FormDebugComponent]
})
export class DebugModule {}

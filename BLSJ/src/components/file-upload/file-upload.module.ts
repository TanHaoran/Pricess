import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {FileUploadComponent} from "./file-upload";

@NgModule({
  declarations: [
    FileUploadComponent
  ],
  imports: [
    IonicPageModule.forChild(FileUploadComponent)
  ],
  exports: [
    FileUploadComponent
  ],
  providers:[
  ],
  entryComponents: [
    FileUploadComponent
    ]
})
export class FileUploadComponentModule {}

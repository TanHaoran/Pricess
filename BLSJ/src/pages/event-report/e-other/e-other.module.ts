import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {EOtherPage} from "./e-other";
import {FileUploadComponentModule} from "../../../components/file-upload/file-upload.module";


@NgModule({
  declarations: [
    EOtherPage,
  ],
  imports: [
    FileUploadComponentModule,
    IonicPageModule.forChild(EOtherPage)
  ],
  exports: [
    EOtherPage
  ],
  providers:[
  ],
  entryComponents: [
    EOtherPage
    ]
})
export class EOtherPageModule {}

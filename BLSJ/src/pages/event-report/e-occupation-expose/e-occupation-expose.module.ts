import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {EOccupationExposePage} from "./e-occupation-expose";
import {IonTextToggleComponentModule} from "../../../components/ion-text-toggle/ion-text-toggle.module";
import {FileUploadComponentModule} from "../../../components/file-upload/file-upload.module";


@NgModule({
  declarations: [
    EOccupationExposePage,
  ],
  imports: [
    IonTextToggleComponentModule,
    FileUploadComponentModule,
    IonicPageModule.forChild(EOccupationExposePage)
  ],
  exports: [
    EOccupationExposePage
  ],
  providers:[
  ],
  entryComponents: [
    EOccupationExposePage
    ]
})
export class EOccupationExposePageModule {}

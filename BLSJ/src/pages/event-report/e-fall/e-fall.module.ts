import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {EFallPage} from "./e-fall";
import {IonTextToggleComponentModule} from "../../../components/ion-text-toggle/ion-text-toggle.module";
import {FileUploadComponentModule} from "../../../components/file-upload/file-upload.module";


@NgModule({
  declarations: [
    EFallPage,
  ],
  imports: [
    IonTextToggleComponentModule,
    FileUploadComponentModule,
    IonicPageModule.forChild(EFallPage)
  ],
  exports: [
    EFallPage
  ],
  providers:[
  ],
  entryComponents: [
    EFallPage
    ]
})
export class EFallPageModule {}

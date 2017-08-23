import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {EFallBedPage} from "./e-fall-bed";
import {IonTextToggleComponentModule} from "../../../components/ion-text-toggle/ion-text-toggle.module";
import {FileUploadComponentModule} from "../../../components/file-upload/file-upload.module";


@NgModule({
  declarations: [
    EFallBedPage,
  ],
  imports: [
    IonTextToggleComponentModule,
    FileUploadComponentModule,
    IonicPageModule.forChild(EFallBedPage)
  ],
  exports: [
    EFallBedPage
  ],
  providers:[
  ],
  entryComponents: [
    EFallBedPage
    ]
})
export class EFallBedPageModule {}

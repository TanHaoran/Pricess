import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ETubePage} from "./e-tube";
import {FileUploadComponentModule} from "../../../components/file-upload/file-upload.module";
import {IonTextToggleComponentModule} from "../../../components/ion-text-toggle/ion-text-toggle.module";


@NgModule({
  declarations: [
    ETubePage,
  ],
  imports: [
    IonTextToggleComponentModule,
    FileUploadComponentModule,
    IonicPageModule.forChild(ETubePage)
  ],
  exports: [
    ETubePage
  ],
  providers:[
  ],
  entryComponents: [
    ETubePage
    ]
})
export class ETubePageModule {}

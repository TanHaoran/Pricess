import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {EPressureUlcersPage} from "./e-pressure-ulcers";
import {FileUploadComponentModule} from "../../../components/file-upload/file-upload.module";
import {IonTextToggleComponentModule} from "../../../components/ion-text-toggle/ion-text-toggle.module";
import {PEventListComponentModule} from "../../../components/p-event-list/p-event-list.module";


@NgModule({
  declarations: [
    EPressureUlcersPage,
  ],
  imports: [
    IonTextToggleComponentModule,
    FileUploadComponentModule,
    PEventListComponentModule,
    IonicPageModule.forChild(EPressureUlcersPage)
  ],
  exports: [
    EPressureUlcersPage
  ],
  providers:[
  ],
  entryComponents: [
    EPressureUlcersPage
    ]
})
export class EPressureUlcersPageModule {}

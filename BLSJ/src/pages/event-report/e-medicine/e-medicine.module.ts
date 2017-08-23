import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {EMedicinePage} from "./e-medicine";
import {IonTextToggleComponentModule} from "../../../components/ion-text-toggle/ion-text-toggle.module";
import {FileUploadComponentModule} from "../../../components/file-upload/file-upload.module";
import {MEventCategoryPanelComponentModule} from "../../../components/m-event-category-panel/m-event-category-panel.module";
import {MEventCategoryListComponentModule} from "../../../components/m-event-category-list/m-event-category-list.module";


@NgModule({
  declarations: [
    EMedicinePage,
  ],
  imports: [
    IonTextToggleComponentModule,
    FileUploadComponentModule,
    MEventCategoryPanelComponentModule,
    MEventCategoryListComponentModule,
    IonicPageModule.forChild(EMedicinePage)
  ],
  exports: [
    EMedicinePage
  ],
  providers:[
  ],
  entryComponents: [
    EMedicinePage
    ]
})
export class EMedicinePageModule {}

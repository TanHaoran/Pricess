import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {MEventCategoryListComponent} from "./m-event-category-list";
import {MEventCategoryPanelComponentModule} from "../m-event-category-panel/m-event-category-panel.module";

@NgModule({
  declarations: [
    MEventCategoryListComponent
  ],
  imports: [
    MEventCategoryPanelComponentModule,
    IonicPageModule.forChild(MEventCategoryListComponent)
  ],
  exports: [
    MEventCategoryListComponent
  ],
  providers:[
  ],
  entryComponents: [
    MEventCategoryListComponent
    ]
})
export class MEventCategoryListComponentModule {}

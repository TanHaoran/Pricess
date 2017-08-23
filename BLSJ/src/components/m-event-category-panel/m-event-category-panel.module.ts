import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {MEventCategoryPanelComponent} from "./m-event-category-panel";

@NgModule({
  declarations: [
    MEventCategoryPanelComponent
  ],
  imports: [
    IonicPageModule.forChild(MEventCategoryPanelComponent)
  ],
  exports: [
    MEventCategoryPanelComponent
  ],
  providers:[
  ],
  entryComponents: [
    MEventCategoryPanelComponent
    ]
})
export class MEventCategoryPanelComponentModule {}

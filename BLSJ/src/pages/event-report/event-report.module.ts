import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {EventReportPage} from "./event-report";


@NgModule({
  declarations: [
    EventReportPage
  ],
  imports: [
    IonicPageModule.forChild(EventReportPage)
  ],
  exports: [
    EventReportPage
  ],
  providers:[
  ],
  entryComponents: [
    EventReportPage
    ]
})
export class EventReportPageModule {}

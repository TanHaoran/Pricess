import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventAuditPage } from './event-audit';


@NgModule({
  declarations: [
    EventAuditPage
  ],
  imports: [
    IonicPageModule.forChild(EventAuditPage)
  ],
  exports: [
    EventAuditPage
  ],
  providers:[
  ],
  entryComponents: [
        EventAuditPage
    ]
})
export class EventAllListPageModule {}
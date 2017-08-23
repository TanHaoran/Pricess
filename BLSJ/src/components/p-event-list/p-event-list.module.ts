import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {PEventListComponent} from "./p-event-list";


@NgModule({
  declarations: [
    PEventListComponent
  ],
  imports: [
    IonicPageModule.forChild(PEventListComponent)
  ],
  exports: [
    PEventListComponent
  ],
  providers:[
  ],
  entryComponents: [
    PEventListComponent
    ]
})
export class PEventListComponentModule {}

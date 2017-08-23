import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {EZeroPage} from "./e-zero";


@NgModule({
  declarations: [
    EZeroPage
  ],
  imports: [
    IonicPageModule.forChild(EZeroPage)
  ],
  exports: [
    EZeroPage
  ],
  providers:[
  ],
  entryComponents: [
    EZeroPage
    ]
})
export class EZeroPageModule {}

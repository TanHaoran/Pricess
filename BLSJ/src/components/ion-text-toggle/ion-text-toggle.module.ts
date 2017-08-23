import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {IonTextToggleComponent} from "./ion-text-toggle";

@NgModule({
  declarations: [
    IonTextToggleComponent
  ],
  imports: [
    IonicPageModule.forChild(IonTextToggleComponent)
  ],
  exports: [
    IonTextToggleComponent
  ],
  providers:[
  ],
  entryComponents: [
    IonTextToggleComponent
    ]
})
export class IonTextToggleComponentModule {}

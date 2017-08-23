import { Component , Input, Output, EventEmitter} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {Util} from '../../providers/common/util';
@IonicPage({
  name: 'm-event-category-panel',
  segment: 'm-event-category-panel'
})
@Component({
  selector: 'm-event-category-panel',
  templateUrl: 'm-event-category-panel.html'
})
export class MEventCategoryPanelComponent {
  public maxYear:number =new Date().getFullYear()+1;
  public minYear:number =new Date().getFullYear()-1;
  text: string;
  @Input()  mEventInfo:any = {};
  @Input() dataSource: any = {};
  @Output()  insertItem: EventEmitter<any>;
  constructor(public util: Util) {
    this.insertItem = new EventEmitter();
  }
  insertToList(){
    if(this.mEventInfo.content.dAdviceTime){
      this.mEventInfo.content.dAdviceTime=this.util.replaceDate(this.mEventInfo.content.dAdviceTime);

    }
    if (this.mEventInfo.content.wrongTime){
      this.mEventInfo.content.wrongTime=this.util.replaceDate(this.mEventInfo.content.wrongTime);
    }
    this.insertItem.emit();
  }
  ngOnInit(){
    console.log(this.mEventInfo);
    this.mEventInfo.content.dAdviceTime=this.util.getNow();
    this.mEventInfo.content.wrongTime=this.util.getNow();
  }

  clearOtherMedicine(item,otherDataKey){
    console.log('112');
    if(this.mEventInfo[item] != '112')
    {
      this.mEventInfo[otherDataKey]='';
    }
  }

  clearOtherMedicineContent(item,otherDataKey){
    if(this.mEventInfo.content[item] != '112')
    {
      this.mEventInfo.content[otherDataKey]='';
    }
  }

}

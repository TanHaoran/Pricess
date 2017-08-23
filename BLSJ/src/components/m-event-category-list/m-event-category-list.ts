import { Component , Input} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {Util} from '../../providers/common/util';

@IonicPage({
  name: 'm-event-category-list',
  segment: 'm-event-category-list'
})
@Component({
  selector: 'm-event-category-list',
  templateUrl: 'm-event-category-list.html'
})
export class MEventCategoryListComponent {

  text: string;
  @Input()  mEventCategoryList:Array<any> = [];
  public dataSource: any = {};
  constructor(public util: Util) {
    console.log('Hello MEventCategoryListComponent Component');
    this.text = 'Hello World';
    this.dataSource = this.util.getDataSource();
  }
  delmEvent(index){
    this.mEventCategoryList.splice(index,1);
  }

}

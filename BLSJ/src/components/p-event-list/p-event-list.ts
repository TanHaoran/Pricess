import { Component , Input, Output, EventEmitter} from '@angular/core';
import { IonicPage} from 'ionic-angular';
import {Util} from '../../providers/common/util';

/**
 * Generated class for the PEventListComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@IonicPage({
  name: 'p-event-list',
  segment: 'p-event-list'
})
@Component({
  selector: 'p-event-list',
  templateUrl: 'p-event-list.html'
})
export class PEventListComponent {
	@Input()  pEventList:Array<any> = [];
	@Output()  delItem: EventEmitter<any>;
	public dataSource: any = {};
  text: string;

  constructor(public util: Util) {
    console.log('Hello PEventListComponent Component');
    this.text = 'Hello World';
    this.dataSource = this.util.getDataSource();
    this.delItem = new EventEmitter();
  }
  delPanel(index){
  	this.pEventList.splice(index,1);
  }

}

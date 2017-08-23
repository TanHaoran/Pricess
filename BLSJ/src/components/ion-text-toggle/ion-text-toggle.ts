import { Component, ViewChild , Input, Output, EventEmitter} from '@angular/core';
import {IonicPage} from 'ionic-angular';
// import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms'

@IonicPage({
  name: 'ion-text-toggle',
  segment: 'ion-text-toggle'
})
@Component({
  selector: 'ion-text-toggle',
  templateUrl: 'ion-text-toggle.html'
})
export class IonTextToggleComponent {

  @Input() data:any = "";
  @Input() title:string = "";
  @Input() toggleT:string = "无";
  @Input() toggleF:string = "有";
  @Output()  modelChange: EventEmitter<any>;
  @ViewChild('toggleReverse') toggleReverse
  constructor() {
  	this.modelChange = new EventEmitter();
    // this.data.isChecked = !this.data.isChecked;
  }
  changeModel(){
    console.log(this.data.isChecked);
    this.modelChange.emit(this.data);
    // this.data.isChecked = !this.data.isChecked;
  }

  ngOnInit(){
    let icon = this.toggleReverse._elementRef.nativeElement.childNodes[0];
    let inner = icon.childNodes[0];
    inner.innerText += this.toggleF;
    icon.innerHTML += this.toggleT;

    // let eles = this.toggleReverse._elementRef.nativeElement;
    // if(eles){
    //   if(this.hasClass(eles,"toggle-checked")){
    //     this.removeClass(eles,"toggle-checked");
    //   }else{
    //     this.addClass(eles,"toggle-checked");
    //   }
    // }

  }

  // hasClass(ele,cls) {
  //   return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
  // }

  // addClass(ele,cls) {
  //   if (!this.hasClass(ele,cls)) ele.className += " "+cls;
  // }

  // removeClass(ele,cls) {
  //   if (this.hasClass(ele,cls)) {
  //     var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
  //     ele.className=ele.className.replace(reg,' ');
  //   }
  // }

}

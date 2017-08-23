import { Component } from '@angular/core';
import { NavController, NavParams,IonicPage } from 'ionic-angular';
import {HomeService} from "../../providers/home/HomeService";

@IonicPage({
  name: 'page-event-report',
  segment: 'page-event-report'
})
@Component({
  selector: 'page-event-report',
  templateUrl: 'event-report.html',
})
export class EventReportPage {
  public showBack:boolean=false;
  public from: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,public homeService:HomeService) {
    if(this.homeService.fromIndex){
        this.showBack=true;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventReportPage');
  }
  goEFall(){
      this.navCtrl.push("page-e-fall");
  }
  goEFallBed(){
      this.navCtrl.push("page-e-fall-bed");
  }
  goETube(){
      this.navCtrl.push("page-e-tube");
  }
  goEMedicine(){
      this.navCtrl.push("page-e-medicine");
  }
  goPressureUlcers(){
      this.navCtrl.push("page-e-pressure-ulcers");
  }
  goOccupationExpose(){
      this.navCtrl.push("page-e-occupation-expose");
  }
  goOther(){
      this.navCtrl.push("page-e-other");
  }
  goZero(){
      this.navCtrl.push("page-e-zero");
  }
  //调用安卓返回事件
  goBack(){
    if((<any>window).backUtil){
      (<any>window).backUtil.back();
    }
  }
  ionViewWillLeave(){
    console.log('sed page leave');
    this.navCtrl.first;
  }
}

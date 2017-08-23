import {Component} from '@angular/core';
import {NavController, NavParams, ToastController, IonicPage} from 'ionic-angular';
import {EventReportService} from "../../../providers/eventReportService";
import {HomeService} from "../../../providers/home/HomeService";
import {Util} from "../../../providers/common/util";
import {CommonCheck} from "../../../providers/common/CommonCheck";

@IonicPage({
  name: 'page-e-zero',
  segment: 'page-e-zero'
})
@Component({
  selector: 'page-e-zero',
  templateUrl: 'e-zero.html',
})
export class EZeroPage {
  public userInfo: any = {};
  public hospitalInfo: any = {};
  public zeroData: any = {};
  public submitDisable: boolean = false;
  public Year: number;
  public Month: number;
  public currentYear: string = this.util.dateFormat(new Date(), 'yyyy');

  constructor(public navCtrl: NavController, public navParams: NavParams, public eventReportService: EventReportService, public homeService: HomeService, public util: Util, public commonCheck: CommonCheck, public toastCtrl: ToastController) {
    this.userInfo =this.util.deepCopy(this.homeService.userInfo);
    this.userInfo.SystemTime=this.util.str2date(this.userInfo.SystemTime,'yyyy-MM-dd');
    this.hospitalInfo = this.homeService.hospitalInfo;
    this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EZeroPage');
  }

  init() {
    let JaneDate = new Date(this.userInfo.SystemTime);
    JaneDate = new Date(JaneDate.setMonth(JaneDate.getMonth() - 1));
    this.Year = JaneDate.getFullYear();
    this.Month = JaneDate.getMonth() + 1;
    this.getZeroSubmitedOrNot();
  }

  getZeroData() {
    this.zeroData.OperatorID = this.userInfo.ReUId || '';
    this.zeroData.HospId = this.userInfo.HospId || '';
    this.zeroData.HospDepId = this.userInfo.HospDepId || '';
    this.zeroData.EveresName = '本月零事件';
    this.zeroData.SpellNo = 'ZERO';
    return this.zeroData;
  }

  getZeroSubmitedOrNot() {
    let yue = this.getLastMonth();
    let Hospdata = {eud: this.userInfo.HospDepId, yue: yue};
    console.log(Hospdata);
    //根据上报的零事件发生日期判断是否上报过零事件，时间要去掉一个月
    this.eventReportService.getZeroSubmitedOrNot(Hospdata).subscribe((resData: any) => {
      console.log(resData);
      if (resData) {
        //已上报零事件
        this.submitDisable = true;
      }else{
        //未上报零事件
        this.submitDisable =false;
      }
    },err => {
      this.showToast('获取数据失败，请检查网络', 'middle');
      });
  }

  getLastMonth() {
    let time = '';
    console.log(this.userInfo.SystemTime);
    let temp = this.userInfo.SystemTime.split('-');
    if (temp.length > 2) {
      if((parseInt(temp[1], 10)-1)==0){
        time=temp[0]-1+'-'+ '12'+'-01';
      }else{
        time=temp[0]+'-'+ (parseInt(temp[1], 10)-1)+'-01';
      }
    }
    return time;
  }

  submit() {
    if (!this.submitDisable) {
      this.checkOtherSubmited();
    }
  }
  submitZero(){
    this.submitDisable = true;
    this.getZeroData();
    this.eventReportService.submitEventZero({model: this.zeroData}).subscribe((data: any) => {
      if (data === "103") {
        this.showToast('上报成功', 'middle');
        this.init();
        this.navCtrl.push("page-event-report");
      } else {
        this.submitDisable=false;
        this.showToast('上报失败', 'middle');
      }
    }, err => {
      this.showToast('网络错误', 'middle');
      return;
    });
  }
  checkOtherSubmited(){
    let yue=this.getLastMonth();
    let data={rud:(this.userInfo.ReUId),yue:yue};
    console.log(data);
    this.eventReportService.getOthersSubmitedOrNot(data).subscribe((res:any)=>{
      console.log(res);
      if(res==='377'){
        this.submitZero();
      }else{
        this.showToast('已上报其它事件无法上报零事件', 'middle');
        return;
      }
    }, err => {
      this.showToast('网络错误', 'middle');
      return;
    });
  }

  showToast(msg, pos) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 1000,
      position: pos
    });
    toast.present();
  }

}

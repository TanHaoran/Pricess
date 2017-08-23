import {Component} from '@angular/core';
import {NavController, NavParams, IonicPage, ToastController} from 'ionic-angular';
import {HomeService} from "../../providers/home/HomeService";
import {AuditService} from "../../providers/auditService";
import * as _ from 'underscore';
import {Util} from "../../providers/common/util";

@IonicPage({
  name: 'page-event-all-list',
  segment: 'page-event-all-list'
})
@Component({
  selector: 'page-event-all-list',
  templateUrl: 'event-all-list.html',
})
export class EventAllListPage {
  public userInfo: any = {};
  public hospitalInfo: any = {};
  // public startDate:any =this.util.getFirstDay();
  // public startDate:any =this.util.getThisMonthDay();
  // public endDate:any =this.util.dateFormat(new Date(),'yyyy-MM-dd');
  public selectEventLevel: any = "";
  public selectEvent: any = "";
  public tableData: any = [];
  public page: number = 1;
  public data: any = {};
  public hideList: boolean = false;
  public roleState:any={};

  constructor(public navCtrl: NavController, public navParams: NavParams, public homeService: HomeService, public auditService: AuditService, public util: Util, public toastCtrl: ToastController) {
    this.userInfo = this.homeService.userInfo;
    this.hospitalInfo = this.homeService.hospitalInfo;
    this.data = {rud: this.userInfo.ReUId, pageSize: 10, pageNumber: this.page};
    this.checkRole();
    this.getEventList();
    console.log(this.userInfo);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventAllListPage');
  }

  goAuditDetail(item) {
    this.navCtrl.push('page-audit-detail', {
      EveresItem: item
    });
  }

  getEventList() {
    if(this.roleState=='145'){
      this.auditService.getHospEvent(this.data).subscribe((resData: any)=>{
        console.log('999');
        if (resData.length === 0&& this.page == 1) {
          this.hideList = true;
        } else {
          if (resData.length == 0 && this.page > 1) {
            this.showToast('没有更多内容了', 'middle');
            return;
          } else {
            this.hideList = false;
            var dataSource = this.util.getDataSource();

            _.each(resData, (item) => {
              item.FeedbackState = (item.FeedbackState == 0) ? '无' : '有';
              item.HappenedDate = this.util.str2date(item.HappenedDate, 'yyyy-MM-dd HH:mm');
              item.SendtoDate = this.util.str2date(item.SendtoDate, 'yyyy-MM-dd HH:mm');
            });

            _.each(resData, (row) => {
              _.each(dataSource.eventType, function (item) {
                if (item.ECodeValue === row.EveresName) {
                  row.EveresCode = item.ECodeValue;
                  row.EveresName = item.ECodeTag;
                }
              });
            });

            _.each(resData, (row) => {
              _.each(dataSource.eventLevel, function (level) {
                if (row.EveresLevel === level.ECodeValue) {
                  row.EveresLevel = level.ECodeTag;
                }
              })
            });
            this.tableData.push(...resData);
            // this.tableData = resData;
            console.log(this.tableData);
          }
        }
      },err=> {
        // this.tableData = [];
        this.hideList = true;
      });
    }else{
      this.auditService.getAllEvent(this.data).subscribe((resData: any) => {
        console.log(resData);
        if (resData.length === 0&& this.page == 1) {
          this.hideList = true;
        } else {
          if (resData.length == 0 && this.page > 1) {
            this.showToast('没有更多内容了', 'middle');
            return;
          } else {
            this.hideList = false;
            var dataSource = this.util.getDataSource();

            _.each(resData, (item) => {
              item.FeedbackState = (item.FeedbackState == 0) ? '无' : '有';
              item.HappenedDate = this.util.str2date(item.HappenedDate, 'yyyy-MM-dd HH:mm');
              item.SendtoDate = this.util.str2date(item.SendtoDate, 'yyyy-MM-dd HH:mm');
            });

            _.each(resData, (row) => {
              _.each(dataSource.eventType, function (item) {
                if (item.ECodeValue === row.EveresName) {
                  row.EveresCode = item.ECodeValue;
                  row.EveresName = item.ECodeTag;
                }
              });
            });

            _.each(resData, (row) => {
              _.each(dataSource.eventLevel, function (level) {
                if (row.EveresLevel === level.ECodeValue) {
                  row.EveresLevel = level.ECodeTag;
                }
              })
            });
            this.tableData.push(...resData);
            // this.tableData = resData;
            console.log(this.tableData);
          }
        }
      }, err => {
        // this.tableData = [];
        this.hideList = true;
      });
    }


  }

  doInfinite(infiniteScroll) {
    if (!this.hideList) {
      this.page++;
      this.data = {rud: this.userInfo.ReUId, pageSize: 10, pageNumber: this.page};
      setTimeout(() => {
        this.getEventList();
        console.log('Async operation has ended');
        infiniteScroll.complete();
      }, 500);
    }
  }

  //调用安卓返回事件
  goBack() {
    if ((<any>window).backUtil) {
      (<any>window).backUtil.back();
    }
  }

  showToast(msg, pos) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 1000,
      position: pos
    });
    toast.present();
  }

  checkRole(){
    let roles = this.homeService.userInfo.GroupRole.split('|');
    for(var i=0;i<roles.length;i++)
    {
      switch(roles[i])
      {
        case '145':
          this.roleState='145';
          break;
        case '146':
          this.roleState='146';
          break;
        case '147':
          this.showToast('您的权限暂时无法在手机端使用','middle');
          break;
        case '148':this.homeService.right.region=true;
          this.showToast('您的权限暂时无法在手机端使用','middle');
          break;
        default :break;
      }
    }
  }


}

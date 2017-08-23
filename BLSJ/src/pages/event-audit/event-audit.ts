import {Component} from '@angular/core';
import {NavController, NavParams, ToastController, Platform, IonicPage} from 'ionic-angular';
import {AuditService} from '../../providers/auditService';
import {HomeService} from '../../providers/home/HomeService';
import * as _ from 'underscore';
import {Util} from '../../providers/common/util';

@IonicPage({
  name: 'page-event-audit',
  segment: 'page-event-audit'
})
@Component({
  selector: 'page-event-audit',
  templateUrl: 'event-audit.html',
})
export class EventAuditPage {
  public userInfo: any = {};
  public hospitalInfo: any = {};
  public startDate: any = this.util.getThisMonthDay();
  public endDate: any = this.util.dateFormat(new Date(), 'yyyy-MM-dd');
  public selectEventLevel: any = "";
  public selectEvent: any = "";
  public tableData: any = [];
  public hideList: boolean = false;
  public page: number = 1;
  public data: any = {};

  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams, public homeService: HomeService, public auditService: AuditService, public util: Util, public toastCtrl: ToastController) {
    this.userInfo = this.homeService.userInfo;
    this.hospitalInfo = this.homeService.hospitalInfo;
    this.data = {rud: this.userInfo.ReUId, pageSize: 10, pageNumber: this.page};
    this.getEventList();
  }

  ionViewDidLoad() {
    console.log(this.startDate);
    console.log('ionViewDidLoad EventAuditPage');
  }

  goEventReport() {
    this.navCtrl.push("page-event-report");
  }

  goAuditDetail(item) {
    this.navCtrl.push("page-audit-detail", {
      EveresItem: item
    });
  }

  //调用安卓返回事件
  goBack() {
    if ((<any>window).backUtil) {
      (<any>window).backUtil.back();
    }
  }

  getEventList() {
    this.auditService.getUncheckedEvent(this.data).subscribe((resData: any) => {
      console.log(resData);
      if (resData.length == 0 && this.page == 1) {
        this.hideList = true;//列表为空时展示友情提示
      } else {
        this.hideList = false;
        if (resData.length == 0 && this.page > 1) {
          this.showToast('没有更多内容了', 'middle');
          return;
        } else {
          var dataSource = this.util.getDataSource();

          _.each(resData, (item) => {
            item.FeedbackState = (item.FeedbackState == 0) ? '无' : '有';
            item.HappenedDate = this.util.str2date(item.HappenedDate, 'yyyy-MM-dd HH:mm');
            item.SendtoDate = this.util.str2date(item.SendtoDate, 'yyyy-MM-dd HH:mm');
          });

          _.each(resData, (row) => {
            _.each(dataSource.eventType, function (item) {
              if (item.ECodeValue == row.EveresName) {
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
      this.tableData = [];
      this.hideList = true;
    });
  }

// 下拉加载更多，每次增加10条
  doInfinite(infiniteScroll) {
    if (!this.hideList) {
      this.page++;
      this.data = {rud: this.userInfo.ReUId, pageSize: 10, pageNumber: this.page};
      setTimeout(() => {
        this.getEventList();
        infiniteScroll.complete();
      }, 500);
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


}

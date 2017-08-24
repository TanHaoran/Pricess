import {Component} from '@angular/core';
import {NavController, NavParams, ToastController,IonicPage} from 'ionic-angular';

import {LoadEventDataService} from '../../../providers/loadEventDataService';
import {AuditService} from '../../../providers/auditService';
import {Util} from '../../../providers/common/util';
import {HomeService} from "../../../providers/home/HomeService";
import {CommonCheck} from "../../../providers/common/CommonCheck";

@IonicPage({
  name: 'page-audit-detail',
  segment: 'page-audit-detail'
})
@Component({
  selector: 'page-audit-detail',
  templateUrl: 'audit-detail.html',
})
export class AuditDetailPage {
  public EveresItem: any = this.navParams.get("EveresItem");
  public eventID: any = this.navParams.get("eventID");
  public eventServiceName: any = this.navParams.get("eventServiceName");
  public eventCode: any = this.navParams.get("eventCode");
  public modalData: any = {};
  public modalFormData: any = {};
  public showAuditState: boolean = false;
  public roles: any = this.homeService.userInfo.GroupRole;
  public zeroData:any={};
  public submitDisable: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadEventDataService: LoadEventDataService, public homeService: HomeService, public util: Util, public auditService: AuditService, public toastCtrl: ToastController, public commonCheck: CommonCheck) {
    console.log(this.EveresItem);
    let showState = this.homeService.showState; //获取是否为从个人中心进入的上报记录，判断是否显示审核按钮
    if (showState) {
      this.showAuditState = true;
    }
    this.getEItemById();//获取是否为上报后直接跳转而来
  }

  ionViewDidLoad() {
    console.log(this.roles);
  }

  getEItemById() {
    if (this.eventID) {
      console.log(this.eventServiceName);
      //上报成功后返回上报主页面
      this.navCtrl.remove(this.navCtrl.length()-1);
      this.EveresItem.EveresCode = this.eventCode;
      this.EveresItem.EveresId = this.eventID;
      this.handleId();
    } else {
      this.handleId();
    }
  }

  getDataAndDeal(resData) {
    this.modalData = this.util.getEventShowData(resData, this.EveresItem.EveresCode);
    console.log(this.modalData);
    if (this.modalData.AuditStatus == '0') {
      this.EveresItem.ExamineState = '审核中';
    } else if (this.modalData.AuditStatus == '1') {
      this.EveresItem.ExamineState = '已通过';
    } else if (this.modalData.AuditStatus == '2') {
      this.EveresItem.ExamineState = '未通过';
    }
    if (this.modalData.EventLevel) {
      this.modalData.EventLevel = this.modalData.EventLevel + '级';
    }

    if (this.EveresItem.FeedbackState === '无') {
      this.modalData.isShowFadeback = false;
    } else {
      this.modalData.isShowFadeback = true;
    }

  }

  dealUploadFile(data) {
    if (data.FileName != '') {
      data.FileName = this.util.deepCopy(JSON.parse(data.FileName));
      if (data.FileName != null) {
        let temp = this.util.deepCopy(data.FileName);
        console.log(temp);
        let Temp1 = [];
        for (let i = 0; i < temp.length; i++) {
          let TempObj: any = {};
          TempObj.FileNameUser = temp[i].split('split')[0] + '.' + temp[i].split('.')[temp[i].split('.').length - 1];
          // TempObj.FileNameUserPath=this.homeService.filePath+'FX/'+temp[i].split('split')[0] + '.' + temp[i].split('.')[temp[i].split('.').length - 1];
          TempObj.FileNameServer = temp[i];
          TempObj.FileNameServerPath = this.homeService.filePath+'FX/'+temp[i];
          Temp1.push(TempObj);
        }
        data.FileName = this.util.deepCopy(Temp1);
      }
    }
  };

  handleId() {
    switch (this.EveresItem.EveresCode) {
      case '149':
        this.EveresItem.EveresName="压疮评估";
        this.loadEventDataService.getPressureulcersEventData({eud: this.EveresItem.EveresId}).subscribe((resData: any) => {
          this.dealUploadFile(resData);
          this.getDataAndDeal(resData);
        });
        break;
      case '150':
        this.EveresItem.EveresName="其他事件";
        this.loadEventDataService.getOrtherEventData({eud: this.EveresItem.EveresId}).subscribe((resData: any) => {
          this.dealUploadFile(resData);
          this.getDataAndDeal(resData);
        });
        break;
      case '151':
        this.EveresItem.EveresName="零事件";
        this.loadEventDataService.getZeroEventData({eud: this.EveresItem.EveresId}).subscribe((resData: any) => {
          this.modalData.HappenedDate=this.util.str2date(resData.HappenedDate,'yyyy-MM');
          this.zeroData.zeroSendtoDate=this.util.str2date(resData.SendtoDate,'yyyy-MM-dd HH:mm');
          this.modalData.FillStaff=resData.FillStaff;  //上报人员
          this.zeroData.zeroHospdepName=resData.HospdepName;  //上报部门
        });
        break;
      case '152':
        this.EveresItem.EveresName="跌倒坠床";
        this.loadEventDataService.getFallEventData({eud: this.EveresItem.EveresId}).subscribe((resData: any) => {
          if(resData.DdzcType=='242'){
            this.EveresItem.EveresName="跌倒事件";
          }else{
            this.EveresItem.EveresName="坠床事件";
          }
          this.dealUploadFile(resData);
          this.getDataAndDeal(resData);
        });

        break;
      case '153':
        this.EveresItem.EveresName="管路事件";
        this.loadEventDataService.getTubeEventData({eud: this.EveresItem.EveresId}).subscribe((resData: any) => {
          console.log(resData);
          this.dealUploadFile(resData);
          this.getDataAndDeal(resData);
          console.log(resData);
        });
        break;
      // case '154':
      //   this.loadEventDataService.getHiddenDangerEventData({eud: this.EveresItem.EveresId}).subscribe((resData: any) => {
      //     this.dealUploadFile(resData);
      //     this.getDataAndDeal(resData);
      //   });
      //   break;
      case '155':
        this.EveresItem.EveresName="给药事件";
        this.loadEventDataService.getMedicineEventData({eud: this.EveresItem.EveresId}).subscribe((resData: any) => {
          this.dealUploadFile(resData);
          this.getDataAndDeal(resData);
          this.modalData.mEventCategoryList = JSON.parse(resData.GylName);
        });
        break;
      case '156':
        this.EveresItem.EveresName="职业暴露";
        this.loadEventDataService.getOccupationExposeEventData({eud: this.EveresItem.EveresId}).subscribe((resData: any) => {
          let temp=JSON.parse(resData.UseDrug.split("'").join('"')); //使用药物
          var drugList=[];
          for(let i=0;i<temp.length;i++)
          {
          	drugList.push(temp[i].UseDrug+'');
          }
          resData.UseDrug= JSON.stringify(drugList);

          var str='';
          for(let i=0;i<temp.length;i++)
          {
          	if(temp[i].isChecked)
          	{
          		var time='';
          		if(temp[i].UseDrugTime!=undefined)
          		{
          			time=temp[i].UseDrugTime;
          		}
          		if(temp[i].UseDrugName=='其他')
          		{
          			if(resData.UseDrugQt=='')
          			{
          				str+='';
          			}
          			else
          			{
          				str+=resData.UseDrugQt+' '+time+',';
          			}
          		}
          		else
          		{
          			str+=temp[i].UseDrugName+' '+time+',';
          		}
          	}
          }
          str=str.substring(0,str.length-1);
          this.dealUploadFile(resData);
          this.getDataAndDeal(resData);
          this.modalData.UseDrug=str;
        });
        break;
    }
  }

  fadeOrPassAudit(fadeorpass) {

    this.modalFormData.eud = this.EveresItem.EveresId;
    if (this.modalFormData.fadeBack == undefined) {
      this.modalFormData.fadeBack = '';
    }
    if (this.modalFormData.fadeBack.length > 200) {
      this.showToast('反馈意见输入过长,操作失败', 'middle');
      return;
    }
    else {
      if(!this.submitDisable){
        this.submitDisable=true;


        if (fadeorpass) {
          if (this.commonCheck.isNull(this.modalFormData.fadeBack)) {
            this.modalFormData.fadeBack="已通过";
          }
          let dataToSend = {eud: this.modalFormData.eud, fadeBack: this.modalFormData.fadeBack};
          this.auditService.passEvent(dataToSend).subscribe((resData: any) => {
            if (resData === '103') {
              this.showToast('操作成功', 'middle');
              this.submitDisable=false;
              this.navCtrl.push("page-event-audit");
              return;
            }
            else {
              this.submitDisable=false;
              this.showToast('操作失败', 'middle');
              return;
            }
          });
        } else {
          if (this.commonCheck.isNull(this.modalFormData.fadeBack)) {
            this.modalFormData.fadeBack="已拒绝";
          }
          let dataToSend = {eud: this.modalFormData.eud, fadeBack: this.modalFormData.fadeBack};
          this.auditService.fadeBackEvent(dataToSend).subscribe((resData: any) => {
            if (resData === '103') {
              this.submitDisable=false;
              this.showToast('操作成功', 'middle');
              this.navCtrl.push("page-event-audit");
              return;
            }
            else {
              this.submitDisable=false;
              this.showToast('操作失败', 'middle');
              return;
            }
          });
        }
      }

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

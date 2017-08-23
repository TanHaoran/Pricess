import {Component} from '@angular/core';
import {NavController, NavParams, ToastController, IonicPage, AlertController} from 'ionic-angular';
import {EventReportService} from "../../../providers/eventReportService";
import {HomeService} from "../../../providers/home/HomeService";
import {Util} from "../../../providers/common/util";
import {CommonCheck} from "../../../providers/common/CommonCheck";
import * as formDataConfig from '../../../appConfig/formDataConfig';
import * as _ from 'underscore';

@IonicPage({
  name: 'page-e-other',
  segment: 'page-e-other'
})
@Component({
  selector: 'page-e-other',
  templateUrl: 'e-other.html',
})
export class EOtherPage {
  public userInfo: any = {};
  public hospitalInfo: any = {};
  public submitDisable: boolean = false;
  public fileNames: any = [];
  public otherData: any = {
    ExamineState: 0
  };
  public dataSource: any = {};
  public fillStaffName: string = "";
  public fallInvalid: any = {};
  public hurtList: any = {};
  public otherDataTemp: any = {};
  // public currentYear:string = this.util.dateFormat(new Date(),'yyyy');
  public maxYear: number = new Date().getFullYear() + 1;
  public minYear: number = new Date().getFullYear() - 1;

  constructor(public navCtrl: NavController, public navParams: NavParams, public eventReportService: EventReportService, public homeService: HomeService, public util: Util, public commonCheck: CommonCheck, public toastCtrl: ToastController, public alertCtrl: AlertController) {
    this.userInfo = this.homeService.userInfo;
    this.hospitalInfo = this.homeService.hospitalInfo;
    this.initForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EOtherPage');
  }

  initExamineState() {
    if (this.homeService.right.nurse) {
      this.otherData.ExamineState = 0;
    }
    if (this.homeService.right.department) {
      this.otherData.ExamineState = 1;
    }
  }

  initForm() {
    this.dataSource = this.util.getDataSource();
    this.otherData = this.util.deepCopy(formDataConfig.otherData);
    this.otherData.FillStaff = this.hospitalInfo.AersName;
    this.otherData.HappenedDate = this.util.getNow();
    this.initExamineState();
  }

  submit() {

    let yue = this.getTheMonth();
    let getZeroData = {eud: this.userInfo.HospDepId, yue: yue};
    //查看在发生日期所在月是否上报过零事件
    this.eventReportService.getZeroSubmitedOrNot(getZeroData).subscribe((res: any) => {
      console.log(res);
      if (res) {
        this.showConfirm('确定要上报吗？', '发生日期所在月已上报零事件，确认将覆盖零事件，确定上报吗');
      } else {
        this.checkInput();
      }
    }, err => {
      this.showToast('网络故障，请检查网络', 'middle');
    });
  }

  //判断输入是否有误
  checkInput() {
    if (!this.submitDisable) {
      if (this.commonCheck.isNull(this.otherData.HospNumber)) {
        this.showToast('住院号不能为空', 'middle');
        return;
      }
      if (!this.commonCheck.isMinAndMax(this.otherData.HospNumber, 0, 10)) {
        this.showToast('住院号不能大于十位', 'middle');
        return;
      }
      let PatientAgeZero = false;
      if (this.commonCheck.isNull(this.otherData.PatientAge)) {
        this.showToast('患者年龄不能为空', 'middle');
        return;
      }
      PatientAgeZero = ((this.otherData.PatientAge == 0) || (this.otherData.PatientAge == '0'));
      if (!this.commonCheck.isMinAndMax(this.otherData.PatientAge, 0, 4) || PatientAgeZero) {
        this.showToast('患者年龄不能大于4位', 'middle');
        return;
      }
      if (this.commonCheck.isNull(this.otherData.Diagnosis)) {
        this.showToast('患者诊断不能为空', 'middle');
        return;
      }
      if (this.commonCheck.wordMaxLength(this.otherData.Diagnosis, 1500)) {
        this.showToast('患者诊断不能大于一千五百字', 'middle');
        return;
      }
      if (this.commonCheck.isNull(this.otherData.EventDescription)) {
        this.showToast('事件描述不能为空', 'middle');
        return;
      }
      if (this.commonCheck.wordMaxLength(this.otherData.EventDescription, 2500)) {
        this.showToast('事件描述不能大于两千五百字', 'middle');
        return;
      }
      var temp = this.otherData.DetailType;
      if (temp == '157' || temp == '158' || temp == '159' || temp == '160' || temp == '161') {
      } else {
        if (this.commonCheck.isNull(this.otherData.EventLevel)) {
          this.showToast('请选择事件等级', 'middle');
          return;
        }
      }

      this.submitDisable = true;
      this.reportEvent();
    }
  }

  clearBasicData() {
    var temp = this.otherData.DetailType;
    if (temp == '157' || temp == '158' || temp == '159' || temp == '160' || temp == '161') {
      this.otherDataTemp.EventLevel = "";
      this.otherDataTemp.StaffType = "";
      this.otherDataTemp.StaffPosition = "";
      this.otherDataTemp.StaffEducation = "";
      this.otherDataTemp.StaffWorkyears = "";
    }
  }

  reportEvent() {
    this.otherDataTemp = this.util.deepCopy(this.otherData);
    this.clearBasicData();
    this.otherDataTemp.HappenedDate = this.util.date2str(this.otherDataTemp.HappenedDate);
    this.otherDataTemp.SendtoDate = this.util.dateFormat(new Date(), 'YYYY-MM-DD HH:mm hh:mm:ss');
    this.otherDataTemp.SendtoDate = this.util.getNow();
    this.otherDataTemp.SendtoDate = this.util.date2str(this.otherDataTemp.SendtoDate);
    this.otherDataTemp.HospDepId = this.userInfo.HospDepId || '';
    this.otherDataTemp.HospId = this.userInfo.HospId || '';
    this.otherDataTemp.FillStaff = this.userInfo.ReUId || '';
    //this.otherDataTemp.FileName = JSON.stringify(this.fileNames);
    if(this.otherDataTemp.FileNameExist.length>0){
      this.otherDataTemp.FileName = JSON.stringify(this.otherDataTemp.FileNameExist);
    }else{
      this.otherDataTemp.FileName = '';
    }
    this.otherDataTemp.Diagnosis = this.util.ReplaceTextarea(this.otherDataTemp.Diagnosis);
    this.otherDataTemp.EventDescription = this.util.ReplaceTextarea(this.otherDataTemp.EventDescription);
    // if (this.fileNames.length == 0) {
    //   this.otherDataTemp.FileName = '';
    // }

    this.eventReportService.submitEventOther({model: this.otherDataTemp}).subscribe((data: any) => {
      if (data == "104" || data === "") {
        this.showToast('上报失败', 'middle');
      } else {
        this.showToast('上报成功', 'middle');
        this.submitDisable = false;
        this.initForm();
        console.log(data);
        //跳转后不显示审核按钮
        this.homeService.showState = true;
        this.navCtrl.push('page-audit-detail', {
          eventID: data,
          EveresItem: {},
          eventServiceName: 'getOrtherEventData',
          eventCode: '150'
        });
      }
    }, err => {
      this.showToast('上报失败', 'middle');
    });
  }

  onlyNumber(obj, attr) {
    this.util.onlyNumber(obj, attr);
  }

  //去除科学计数法中的e
  removeE(e) {
    return (/[\d]/.test(String.fromCharCode(e.keyCode)));
  }

  getTheMonth() {
    let time = '';
    let temp = this.otherData.HappenedDate.split('-');
    if (temp.length > 2) {
      time = temp[0] + '-' + parseInt(temp[1], 10) + '-01';
    }
    return time;
  }

  getCheckBoxValue(dataSource) {
    return JSON.stringify(_.map(_.filter(dataSource, function (item) {
      return item.isChecked;
    }), function (item) {
      return item.ECodeValue;
    }));
  };

  //状态改变时初始化其他的值
  clearOther(item, otherDataKey) {
    if (this.otherData[item] != '112') {
      this.otherData[otherDataKey] = '';
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

  checkTag(dr) {
    dr.isChecked = !dr.isChecked;
  }

  //弹出确认框
  showConfirm(title, mes) {
    let confirm = this.alertCtrl.create({
      title: title,
      message: mes,
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('取消上报');
            return;
          }
        },
        {
          text: '确定',
          handler: () => {
            console.log('确定上报');
            this.checkInput();
          }
        }
      ]
    });
    confirm.present();
  }
}

import {Component} from '@angular/core';
import {NavController, NavParams, ToastController, IonicPage, AlertController} from 'ionic-angular';
import {EventReportService} from "../../../providers/eventReportService";
import {HomeService} from "../../../providers/home/HomeService";
import {Util} from "../../../providers/common/util";
import {CommonCheck} from "../../../providers/common/CommonCheck";
import * as formDataConfig from '../../../appConfig/formDataConfig';
import * as dataSourceConfig from '../../../appConfig/dataSourceConfig';
import * as _ from 'underscore';

@IonicPage({
  name: 'page-e-medicine',
  segment: 'page-e-medicine'
})
@Component({
  selector: 'page-e-medicine',
  templateUrl: 'e-medicine.html',
})
export class EMedicinePage {
  public formData: any = {};
  public userInfo: any = {};
  public hospitalInfo: any = {};
  public submitDisable: boolean = false;
  public fileNames: any = [];
  public gyData: any = {
    ExamineState: 0
  };
  public dataSource: any = {};
  public fillStaffName: string = "";
  // public fallInvalid:any = {};
  public gyDataTemp: any = {};
  public mEventCategoryList: Array<any> = [];
  public mEventInfo: any = {
    ECodeValue: '0',
    content: {}
  };
  public isShowMeventPanel: boolean = false;
  // public currentYear:string = this.util.dateFormat(new Date(),'yyyy');
  public maxYear: number = new Date().getFullYear() + 1;
  public minYear: number = new Date().getFullYear() - 1;

  constructor(public navCtrl: NavController, public navParams: NavParams, public eventReportService: EventReportService, public homeService: HomeService, public util: Util, public commonCheck: CommonCheck, public toastCtrl: ToastController, public alertCtrl: AlertController) {
    this.userInfo = this.homeService.userInfo;
    this.hospitalInfo = this.homeService.hospitalInfo;
    this.initForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EMedicinePage');
  }

  initExamineState() {
    if (this.homeService.right.nurse) {
      this.gyData.ExamineState = 0;
    }
    if (this.homeService.right.department) {
      this.gyData.ExamineState = 1;
    }
  }

  initForm() {
    this.dataSource = this.util.getDataSource();
    this.dataSource.mEventType = dataSourceConfig.E_REPORT.mEventType;
    this.gyData = this.util.deepCopy(formDataConfig.gyData);
    this.fillStaffName = this.hospitalInfo.AersName;
    this.gyData.HappenedDate = this.util.getNow();
    this.mEventCategoryList = [];
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
  checkInput(){
    if (!this.submitDisable) {
    if (this.commonCheck.isNull(this.gyData.HospNumber)) {
      this.showToast('住院号不能为空', 'middle');
      return;
    }
    if (!this.commonCheck.isMinAndMax(this.gyData.HospNumber, 0, 10)) {
      this.showToast('住院号不能大于十位', 'middle');
      return;
    }
    let PatientAgeZero = false;

    if (this.commonCheck.isNull(this.gyData.PatientAge)) {
      this.showToast('患者年龄不能为空', 'middle');
      return;
    }
    PatientAgeZero = ((this.gyData.PatientAge == 0) || (this.gyData.PatientAge == '0'));

    if (!this.commonCheck.isMinAndMax(this.gyData.PatientAge, 0, 4) || PatientAgeZero) {
      this.showToast('患者年龄不能大于4位', 'middle');
      return;
    }
    if (this.commonCheck.isNull(this.gyData.Diagnosis)) {
      this.showToast('患者诊断不能为空', 'middle');
      return;
    }
    if (this.commonCheck.wordMaxLength(this.gyData.EventDescription, 1500)) {
      this.showToast('患者诊断不能大于一千五百字', 'middle');
      return;
    }

    if (this.commonCheck.isNull(this.gyData.EventDescription)) {
      this.showToast('事件描述不能为空', 'middle');
      return;
    }

    if (this.commonCheck.wordMaxLength(this.gyData.EventDescription, 2500)) {
      this.showToast('事件描述不能大于两千五百字', 'middle');
      return;
    }

    if (this.commonCheck.isNull(this.gyData.EventLevel)) {
      this.showToast('请选择事件等级', 'middle');
      return;
    }
    if (this.commonCheck.isNull(this.gyData.BedUtilization)) {
      this.showToast('当日床位使用率不能为空', 'middle');
      return;
    }
    if (this.commonCheck.isNull(this.gyData.BedNurseRatio)) {
      this.showToast('当日实际床护比不能为空', 'middle');
      return;
    }

      this.submitDisable = true;
      this.reportEvent();
    }
  }

  reportEvent() {
    this.gyDataTemp = this.util.deepCopy(this.gyData);
    this.gyDataTemp.HospDepId = this.userInfo.HospDepId || '';
    this.gyDataTemp.HospId = this.userInfo.HospId || '';
    this.gyDataTemp.FillStaff = this.userInfo.ReUId || '';
    this.gyDataTemp.GylName =  JSON.stringify(this.mEventCategoryList);
    this.gyDataTemp.HappenedDate = this.util.date2str(this.gyData.HappenedDate);
    // this.gyDataTemp.FileName = JSON.stringify(this.fileNames);
    if(this.gyDataTemp.FileNameExist.length>0){
      this.gyDataTemp.FileName = JSON.stringify(this.gyDataTemp.FileNameExist);
    }else{
      this.gyDataTemp.FileName = '';
    }
    this.gyDataTemp.Diagnosis = this.util.ReplaceTextarea(this.gyDataTemp.Diagnosis);
    this.gyDataTemp.EventDescription = this.util.ReplaceTextarea(this.gyDataTemp.EventDescription);
    // if (this.fileNames.length == 0) {
    //   this.gyDataTemp.FileName = '';
    // }
    console.log(this.gyDataTemp);
    this.eventReportService.submitEventMedicine({model: this.gyDataTemp}).subscribe((data:any)=>{
      if(data=="104" || data === ""){
        this.showToast('上报失败', 'middle');
      }else {
        this.showToast('上报成功', 'middle');
        this.submitDisable = true;
        this.initForm();
        console.log(data);
        //跳转后不显示审核按钮
        this.homeService.showState=true;
        this.navCtrl.push('page-audit-detail',{
          eventID:data,
          EveresItem:{},
          eventServiceName:'getMedicineEventData',
          eventCode:'155'
        });
      }
    },err =>{
      this.showToast('上报失败', 'middle');
    });
  }

  getTheMonth() {
    let time = '';
    let temp = this.gyData.HappenedDate.split('-');
    if (temp.length > 2) {
      time = temp[0] + '-' + parseInt(temp[1], 10) + '-01';
    }
    return time;
  }

  //限制输入框只能输入正整数start
  onlyNumber(obj, attr) {
    this.util.onlyNumber(obj, attr);
  }

  //去除科学计数法中的e
  removeE(e) {
    return (/[\d]/.test(String.fromCharCode(e.keyCode)));
  }

  //限制输入框只能输入整数或者小数start
  clearNoNum(obj, attr) {
    this.util.clearNoNum(obj, attr);
  }

  getCheckBoxValue(dataSource) {
    return JSON.stringify(_.map(_.filter(dataSource, function (item) {
      return item.isChecked;
    }), function (item) {
      return item.ECodeValue;
    }));
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

  addMEvent() {
    // $scope.isShowAddECategory = !$scope.isShowAddECategory;
    this.isShowMeventPanel = !this.isShowMeventPanel;
    _.each(this.dataSource.mEventType, (item) => {
      if (item.ECodeValue === this.mEventInfo.ECodeValue) {
        this.mEventInfo.catogery = item.ECodeTag;
      }
    });

    _.each(this.dataSource.drugWay, (item) => {
      if (this.mEventInfo.content.dAdvicePath === item.ECodeValue) {
        this.mEventInfo.content.dAdvicePathTag = this.mEventInfo.content.dAdvicePath === '112' ?
          this.mEventInfo.content.dAdvicePathQt : item.ECodeTag;
      }
      if (this.mEventInfo.content.wrongPath === item.ECodeValue) {
        this.mEventInfo.content.wrongPathTag = this.mEventInfo.content.wrongPath === '112' ?
          this.mEventInfo.content.wrongPathQt : item.ECodeTag;
      }
      if (this.mEventInfo.content.mPath === item.ECodeValue) {
        this.mEventInfo.content.mPathTag = this.mEventInfo.content.mPath === '112' ?
          this.mEventInfo.content.mPathQt : item.ECodeTag;
      }
    });

    this.mEventCategoryList.push(this.util.deepCopy(this.mEventInfo));
    this.clearmEvent();
    console.log(this.mEventCategoryList);
  }

  clearmEvent() {
    this.mEventInfo = {
      ECodeValue: '0',
      content: {}
    };
  };

  insertMevent() {
    this.addMEvent();
  }

  showPanel() {
    this.isShowMeventPanel = !this.isShowMeventPanel;
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

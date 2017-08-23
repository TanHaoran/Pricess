import {Component} from '@angular/core';
import {NavController, NavParams, ToastController, IonicPage, AlertController} from 'ionic-angular';
import {EventReportService} from "../../../providers/eventReportService";
import {HomeService} from "../../../providers/home/HomeService";
import {Util} from "../../../providers/common/util";
import {CommonCheck} from "../../../providers/common/CommonCheck";
import * as formDataConfig from '../../../appConfig/formDataConfig';
import * as _ from 'underscore';


@IonicPage({
  name: 'page-e-occupation-expose',
  segment: 'page-e-occupation-expose'
})
@Component({
  selector: 'page-e-occupation-expose',
  templateUrl: 'e-occupation-expose.html',
})
export class EOccupationExposePage {
  public userInfo: any = {};
  public hospitalInfo: any = {};
  public submitDisable: boolean = false;
  public fileNames: any = [];
  public zyblData: any = {
    ExamineState: 0
  };
  public dataSource: any = {};
  public fillStaffName: string = "";
  public fallInvalid: any = {};
  public hurtList: any = {};
  public zyblDataTemp: any = {};
  public medListShow: any = {};
  public medList: any = [];
  // public currentYear:string = this.util.dateFormat(new Date(),'yyyy');
  public maxYear: number = new Date().getFullYear() + 1;
  public minYear: number = new Date().getFullYear() - 1;

  constructor(public navCtrl: NavController, public navParams: NavParams, public eventReportService: EventReportService, public homeService: HomeService, public util: Util, public commonCheck: CommonCheck, public toastCtrl: ToastController, public alertCtrl: AlertController) {
    this.userInfo = this.homeService.userInfo;
    this.hospitalInfo = this.homeService.hospitalInfo;
    this.initForm();
    console.log('constroctor');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EOccupationExposePage');
  }

  initExamineState() {
    if (this.homeService.right.nurse) {
      this.zyblData.ExamineState = 0;
    }
    if (this.homeService.right.department) {
      this.zyblData.ExamineState = 1;
    }
  }

  drugListInit() {
    switch (this.zyblData.PatientExpose) {
      case "276":
        this.medList = [{UseDrug: 313, UseDrugTime: this.util.getNow(), isChecked: false, UseDrugName: '乙肝免疫球蛋白'},
          {UseDrug: 314, UseDrugTime: this.util.getNow(), isChecked: false, UseDrugName: '乙肝疫苗'}];
        break;
      case "292":
        this.medList = [{UseDrug: 315, UseDrugTime: this.util.getNow(), isChecked: false, UseDrugName: '齐多夫定'}];
        break;
      default :
        this.medList = [{UseDrug: 316, UseDrugTime: this.util.getNow(), isChecked: false, UseDrugName: '拉米夫定'},
          {UseDrug: 317, UseDrugTime: this.util.getNow(), isChecked: false, UseDrugName: '司他夫定'},
          {UseDrug: 318, UseDrugTime: this.util.getNow(), isChecked: false, UseDrugName: '去羟肌苷'},
          {UseDrug: 319, UseDrugTime: this.util.getNow(), isChecked: false, UseDrugName: '茚地那韦'},
          {UseDrug: 320, UseDrugTime: this.util.getNow(), isChecked: false, UseDrugName: '奈非那韦'},
          {UseDrug: 321, UseDrugTime: this.util.getNow(), isChecked: false, UseDrugName: '阿巴卡韦'},
          {UseDrug: 401, UseDrugTime: this.util.getNow(), isChecked: false, UseDrugName: '依非韦伦'},
          {UseDrug: 112, UseDrugTime: this.util.getNow(), isChecked: false, UseDrugName: '其他'}];
        break;
    }
  }

  initForm() {
    this.dataSource = this.util.getDataSource();
    this.zyblData = this.util.deepCopy(formDataConfig.zyblData);
    this.fillStaffName = this.hospitalInfo.AersName;
    this.zyblData.HappenedDate = this.util.getNow();
    this.initExamineState();
    this.drugListInit();
    console.log(this.dataSource.patientExpose);
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
      if (this.zyblData.TouchPatient == '106') {
        this.zyblData.HospNumber = '';
        this.zyblData.PatientExpose = '';
      } else {
        if (this.commonCheck.isNull(this.zyblData.HospNumber)) {
          this.showToast('住院号不能为空', 'middle');
          return;
        }
        if (!this.commonCheck.isMinAndMax(this.zyblData.HospNumber, 0, 10)) {
          this.showToast('住院号不能大于十位', 'middle');
          return;
        }
      }

      if (this.commonCheck.isNull(this.zyblData.EventDescription)) {
        this.showToast('事件描述不能为空', 'middle');
        return;
      }

      if (this.commonCheck.wordMaxLength(this.zyblData.EventDescription, 2500)) {
        this.showToast('事件描述不能大于两千五百字', 'middle');
        return;
      }

      this.submitDisable = true;
      this.reportEvent();
    }
  }

  reportEvent() {
    this.zyblDataTemp = this.util.deepCopy(this.zyblData);
    this.zyblDataTemp.HappenedDate = this.util.date2str(this.zyblDataTemp.HappenedDate);
    this.zyblDataTemp.SendtoDate = this.util.getNow();
    this.zyblDataTemp.SendtoDate = this.util.date2str(this.zyblDataTemp.SendtoDate);
    this.zyblDataTemp.HospDepId = this.userInfo.HospDepId || '';
    this.zyblDataTemp.HospId = this.userInfo.HospId || '';
    this.zyblDataTemp.FillStaff = this.userInfo.ReUId || '';
    let medListTemp = this.util.deepCopy(this.medList);
    medListTemp.map((item) => {
      item.UseDrugTime = this.util.replaceDate(item.UseDrugTime);
      return item;
    });
    this.zyblDataTemp.UseDrug = JSON.stringify(medListTemp).split('"').join("'");
    // this.zyblDataTemp.FileName = JSON.stringify(this.fileNames);
    if(this.zyblDataTemp.FileNameExist.length>0){
      this.zyblDataTemp.FileName = JSON.stringify(this.zyblDataTemp.FileNameExist);
    }else{
      this.zyblDataTemp.FileName = '';
    }
    this.zyblDataTemp.EventDescription = this.util.ReplaceTextarea(this.zyblDataTemp.EventDescription);
    // if (this.fileNames.length == 0) {
    //   this.zyblDataTemp.FileName = '';
    // }
    console.log(this.zyblDataTemp);
    this.eventReportService.submitEventOccupationExpose({model: this.zyblDataTemp}).subscribe((data: any) => {
      console.log(data);
      if (data == "104" || data === "") {
        this.showToast('上报失败', 'middle');
      } else {
        this.showToast('上报成功', 'middle');
        this.submitDisable = false;
        this.initForm();
        //跳转后不显示审核按钮
        this.homeService.showState = true;
        this.navCtrl.push('page-audit-detail', {
          eventID: data,
          EveresItem: {},
          eventServiceName: 'getOccupationExposeEventData',
          eventCode: '156'
        });
      }
    }, err => {
      this.showToast('上报失败了', 'middle');
    });

  }

  getTheMonth() {
    let time = '';
    let temp = this.zyblData.HappenedDate.split('-');
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
  }

  showToast(msg, pos) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 1000,
      position: pos
    });
    toast.present();
  }

  showOthersEditor(item, showKey, otherDataKey) {
    if (item.ECodeValue === '112') {
      if (item.isChecked) {
        this[showKey] = true;
      } else {
        this[showKey] = false;
        this.zyblData[otherDataKey] = '';
      }
    }
  }

  clearOther(item, otherDataKey) {
    if (this.zyblData[item] != '112') {
      this.zyblData[otherDataKey] = '';
    }
    console.log('clear');
  }

  clearHurtOther(item, otherDataKey) {
    if (this.zyblData[item] != '310') {
      this.zyblData[otherDataKey] = '';
    }
    console.log('clear hurt');
  }

  checkTag(dr) {
    dr.isChecked = !dr.isChecked;
  }

  showDrug() {
    this.drugListInit();
    this.clearOther('PatientExpose', 'PatientExposeQt');
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

  ngOnInit() {
    console.log('init');
    // this.drugListInit();
  }

}

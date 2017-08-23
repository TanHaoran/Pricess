import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, ToastController, IonicPage, AlertController} from 'ionic-angular';

import {EventReportService} from '../../../providers/eventReportService';
import {HomeService} from '../../../providers/home/HomeService';
import {CommonCheck} from '../../../providers/common/CommonCheck';
import {Util} from '../../../providers/common/util';
import * as formDataConfig from '../../../appConfig/formDataConfig';
import * as _ from 'underscore';

@IonicPage({
  name: 'page-e-pressure-ulcers',
  segment: 'page-e-pressure-ulcers'
})
@Component({
  selector: 'page-e-pressure-ulcers',
  templateUrl: 'e-pressure-ulcers.html',
})
export class EPressureUlcersPage {
  @ViewChild('pListCom') pListCom;
  public userInfo: any = {};
  public hospitalInfo: any = {};
  public submitDisable: boolean = false;
  public fileNames: any = [];
  public ycData: any = {
    ExamineState: 0
  };
  public dataSource: any = {};
  public fillStaffName: string = "";
  public fallInvalid: any = {};
  public hurtList: any = {};
  public ycDataTemp: any = {};
  public pEventList: Array<any> = [];
  public pEvent: any = {
    DisplayOrder: '',
    MeterHeight: '',
    MeterLength: '',
    MeterWidth: '',
    PartsImg: '',
    PartsName: '',
    QhDepth: '',
    QhPoint: '',
    Staging: '143'
  };
  // public currentYear:string = this.util.dateFormat(new Date(),'yyyy');
  public maxYear: number = new Date().getFullYear() + 1;
  public minYear: number = new Date().getFullYear() - 1;

  constructor(public navCtrl: NavController, public navParams: NavParams, public eventReportService: EventReportService, public homeService: HomeService,
              public util: Util, public commonCheck: CommonCheck, public toastCtrl: ToastController, public alertCtrl: AlertController) {
    this.userInfo = this.homeService.userInfo;
    this.hospitalInfo = this.homeService.hospitalInfo;
    this.initForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EPressureUlcersPage');
  }

  initExamineState() {
    if (this.homeService.right.nurse) {
      this.ycData.ExamineState = 0;
    }
    if (this.homeService.right.department) {
      this.ycData.ExamineState = 1;
    }
  }

  initForm() {
    this.dataSource = this.util.getDataSource();
    this.ycData = this.util.deepCopy(formDataConfig.ycData);

    this.pEventList = [
      {
        DisplayOrder: '',
        MeterHeight: '',
        MeterLength: '',
        MeterWidth: '',
        PartsImg: '',
        PartsName: '',
        QhDepth: '',
        QhPoint: '',
        Staging: '143'
      }
    ];

    console.log(this.pEventList);

    this.fillStaffName = this.hospitalInfo.AersName;
    this.ycData.HappenedDate = this.util.getNow();
    this.ycData.EvaluateDate = this.util.getNow();
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
      if (this.commonCheck.isNull(this.ycData.HospNumber)) {
        this.showToast('住院号不能为空', 'middle');
        return;
      }
      if (!this.commonCheck.isMinAndMax(this.ycData.HospNumber, 0, 10)) {
        this.showToast('住院号不能大于十位', 'middle');
        return;
      }

      let PatientAgeZero = false;

      if (this.commonCheck.isNull(this.ycData.PatientAge)) {
        this.showToast('患者年龄不能为空', 'middle');
        return;
      }
      PatientAgeZero = ((this.ycData.PatientAge == 0) || (this.ycData.PatientAge == '0'));
      if (!this.commonCheck.isMinAndMax(this.ycData.PatientAge, 0, 4) || PatientAgeZero) {
        this.showToast('患者年龄不能大于4位', 'middle');
        return;
      }

      if (this.commonCheck.isNull(this.ycData.Diagnosis)) {
        this.showToast('患者诊断不能为空', 'middle');
        return;
      }
      if (this.commonCheck.wordMaxLength(this.ycData.Diagnosis, 1500)) {
        this.showToast('患者诊断不能大于一千五百字', 'middle');
        return;
      }


      if (this.commonCheck.isNull(this.ycData.EvaluateScore)) {
        this.showToast('评估分值不能为空', 'middle');
        return;
      }

      if (!this.commonCheck.isMinAndMax(this.ycData.EvaluateScore, 0, 100)) {
        this.showToast('请正确输入评估分值', 'middle');
        return;
      }


      this.submitDisable = true;
      this.reportEvent();
    }
  }

  reportEvent() {
    this.ycDataTemp = this.util.deepCopy(this.ycData);
    this.ycDataTemp.HappenedDate = this.util.date2str(this.ycDataTemp.HappenedDate);
    this.ycDataTemp.EvaluateDate = this.util.date2str(this.ycDataTemp.EvaluateDate);
    this.ycDataTemp.HospDepId = this.userInfo.HospDepId || '';
    this.ycDataTemp.HospId = this.userInfo.HospId || '';
    this.ycDataTemp.FillStaff = this.userInfo.ReUId || '';
    for (var i = 0; i < this.pEventList.length; i++) {
      if (this.pEventList[i].MeterHeight == '') {
        this.pEventList[i].MeterHeight = '0';
      }
      if (this.pEventList[i].MeterLength == '') {
        this.pEventList[i].MeterLength = '0';
      }
      if (this.pEventList[i].MeterWidth == '') {
        this.pEventList[i].MeterWidth = '0';
      }
    }
    this.ycDataTemp.Parts = this.pEventList;
    // this.ycDataTemp.FileName = JSON.stringify(this.fileNames);
    if(this.ycDataTemp.FileNameExist.length>0){
      this.ycDataTemp.FileName = JSON.stringify(this.ycDataTemp.FileNameExist);
    }else{
      this.ycDataTemp.FileName = '';
    }
    this.ycDataTemp.IsTakePrevent = this.getCheckBoxValue(this.dataSource.takePrevent);
    this.ycDataTemp.Diagnosis = this.util.ReplaceTextarea(this.ycDataTemp.Diagnosis);

    // if (this.fileNames.length == 0) {
    //   this.ycDataTemp.FileName = '';
    // }

    this.eventReportService.submitEventPressure({model: this.ycDataTemp}).subscribe((data: any) => {
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
          eventServiceName: 'getPressureulcersEventData',
          eventCode: '149'
        });
      }
    }, err => {
      this.showToast('上报失败', 'middle');
    });
  };

  getTheMonth() {
    let time = '';
    let temp = this.ycData.HappenedDate.split('-');
    if (temp.length > 2) {
      time = temp[0] + '-' + parseInt(temp[1], 10) + '-01';
    }
    return time;
  }


  //去除科学计数法中的e
  removeE(e) {
    return (/[\d]/.test(String.fromCharCode(e.keyCode)));
  }

  //限制输入框只能输入正整数start
  onlyNumber(obj, attr) {
    this.util.onlyNumber(obj, attr);
  }

  //限制输入框只能输入正整数end

  //限制输入框只能输入整数或者小数start
  clearNoNum(obj, attr) {
    this.util.clearNoNum(obj, attr);
  }

  //限制输入框只能输入整数或者小数end

  getCheckBoxValue(dataSource) {
    return JSON.stringify(_.map(_.filter(dataSource, function (item) {
      return item.isChecked;
    }), function (item) {
      return item.ECodeValue;
    }));
  };

  showOthersEditor(item, otherDataKey) {
    if (item.ECodeValue === '112') {
      if (item.isChecked) {
      } else {
        this.ycData[otherDataKey] = '';
      }
    }
  }

//清除防护措施选无后已选的数据
  selectTakePrevent(item) {
    if (item.ECodeValue === '228') {
      if (item.isChecked) {
        _.each(this.dataSource.takePrevent, (item) => {
          if (item.ECodeValue !== '228') {
            this.ycData.TakePreventQt = '';
            item.isDisabled = true;
            item.isChecked = false;
          }
        })
      } else {
        _.each(this.dataSource.takePrevent, (item) => {
          if (item.ECodeValue !== '228') {
            item.isDisabled = false;
          }
        })
      }
    }
  }

  clearOther(item, otherDataKey) {
    if (this.ycData[item] != '112') {
      this.ycData[otherDataKey] = '';
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

  checkTag(dr, otherDataKey) {
    dr.isChecked = !dr.isChecked;
    this.showOthersEditor(dr, otherDataKey);
  }

  addPList() {
    console.log(this.pListCom);
    this.pEventList.push(this.util.deepCopy(this.pEvent));
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

import {Component} from '@angular/core';
import {NavController, NavParams, ToastController, IonicPage, AlertController} from 'ionic-angular';
import {EventReportService} from '../../../providers/eventReportService';
import {HomeService} from "../../../providers/home/HomeService";
import {Util} from "../../../providers/common/util";
import {CommonCheck} from "../../../providers/common/CommonCheck";
import * as formDataConfig from '../../../appConfig/formDataConfig';
import * as _ from 'underscore';

@IonicPage({
  name: 'page-e-tube',
  segment: 'page-e-tube'
})
@Component({
  selector: 'page-e-tube',
  templateUrl: 'e-tube.html',
})
export class ETubePage {
  public formData: any = {};
  public userInfo: any = {};
  public hospitalInfo: any = {};
  public submitDisable: boolean = false;
  public fileNames: any = [];
  public glData: any = {
    ExamineState: 0
  };
  public dataSource: any = {};
  public fillStaffName: string = "";
  public glDataTemp: any = {};
  public maxYear: number = new Date().getFullYear() + 1;
  public minYear: number = new Date().getFullYear() - 1;

  constructor(public navCtrl: NavController, public navParams: NavParams, public eventReportService: EventReportService, public homeService: HomeService, public util: Util, public commonCheck: CommonCheck, public toastCtrl: ToastController, public alertCtrl: AlertController) {
    this.userInfo = this.homeService.userInfo;
    this.hospitalInfo = this.homeService.hospitalInfo;
    this.initForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ETubePage');
  }

  initExamineState() {
    if (this.homeService.right.nurse) {
      this.glData.ExamineState = 0;
    }
    if (this.homeService.right.department) {
      this.glData.ExamineState = 1;
    }
  }

  initForm() {
    this.dataSource = this.util.getDataSource();
    this.glData = this.util.deepCopy(formDataConfig.glData);
    this.fillStaffName = this.hospitalInfo.AersName;
    this.glData.InGlTime = this.util.getNow();
    //发生时间
    this.glData.HappenedDate = this.util.getNow();
    //评估时间
    this.glData.EvaluateDate = this.util.getNow();
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
      if (this.commonCheck.isNull(this.glData.HospNumber)) {
        this.showToast('住院号不能为空', 'middle');
        return;
      }

      if (!this.commonCheck.isMinAndMax(this.glData.HospNumber, 0, 10)) {
        this.showToast('住院号不能大于十位', 'middle');
        return;
      }
      let PatientAgeZero = false;

      if (this.commonCheck.isNull(this.glData.PatientAgeUnit)) {
        this.showToast('患者年龄不能为空', 'middle');
        return;
      }

      PatientAgeZero = ((this.glData.PatientAge == 0) || (this.glData.PatientAge == '0'));

      if (!this.commonCheck.isMinAndMax(this.glData.PatientAgeUnit, 0, 4) || PatientAgeZero) {
        this.showToast('患者年龄不能大于4位', 'middle');
        return;
      }

      if (this.commonCheck.isNull(this.glData.Diagnosis)) {
        this.showToast('患者诊断不能为空', 'middle');
        return;
      }
      if (this.commonCheck.wordMaxLength(this.glData.Diagnosis, 1500)) {
        this.showToast('患者诊断不能大于一千五百字', 'middle');
        return;
      }

      if (this.commonCheck.isNull(this.glData.EvaluateScore)) {
        this.showToast('评估分值不能为空', 'middle');
        return;
      }

      if (this.commonCheck.isNull(this.glData.EvaluateScore)) {
        this.showToast('评估分值不能为空', 'middle');
        return;
      }

      if (!this.commonCheck.isMinAndMax(this.glData.EvaluateScore, 0, 100)) {
        this.showToast('请正确输入评估分值', 'middle');
        return;
      }

      if (this.commonCheck.isNull(this.glData.EventDescription)) {
        this.showToast('事件描述不能为空', 'middle');
        return;
      }

      if (this.commonCheck.wordMaxLength(this.glData.EventDescription, 2500)) {
        this.showToast('事件描述不能大于两千五百字', 'middle');
        return;
      }

      if (this.commonCheck.isNull(this.glData.EventLevel)) {
        this.showToast('请选择事件等级', 'middle');
        return;
      }

      this.submitDisable = true;
      this.reportEvent();
    }
  }

  reportEvent() {
    this.glDataTemp = this.util.deepCopy(this.glData);
    //置管日期
    this.glDataTemp.InGlTime = this.util.date2str(this.glDataTemp.InGlTime);
    this.glDataTemp.HappenedDate = this.util.date2str(this.glDataTemp.HappenedDate);
    this.glDataTemp.EvaluateDate = this.util.date2str(this.glDataTemp.EvaluateDate);
    //并发症
    this.glDataTemp.Complication = this.getCheckBoxValue(this.dataSource.complication);
    //
    this.glDataTemp.HospDepId = this.userInfo.HospDepId || '';
    this.glDataTemp.HospId = this.userInfo.HospId || '';
    this.glDataTemp.FillStaff = this.userInfo.ReUId || '';
    // this.glDataTemp.FileName = JSON.stringify(this.fileNames);
    if(this.glDataTemp.FileNameExist.length>0){
      this.glDataTemp.FileName = JSON.stringify(this.glDataTemp.FileNameExist);
    }else{
      this.glDataTemp.FileName = '';
    }
    this.glDataTemp.Diagnosis = this.util.ReplaceTextarea(this.glDataTemp.Diagnosis);
    //事件描述
    this.glDataTemp.EventDescription = this.util.ReplaceTextarea(this.glDataTemp.EventDescription);
    // if (this.fileNames.length == 0) {
    //   this.glDataTemp.FileName = '';
    // }

    console.log(this.glDataTemp);
    this.eventReportService.submitEventTube({model: this.glDataTemp}).subscribe((data: any) => {
      console.log(data);
      if (data === "104" || data === "") {
        this.showToast('上报失败', 'middle');
        return;
      } else {
        this.showToast('上报成功', 'middle');
        this.submitDisable = false;
        this.initForm();
        console.log(data);
        //跳转后不显示审核按钮
        this.homeService.showState = true;
        this.navCtrl.push('page-audit-detail', {
          eventID: data,
          EveresItem: {EveresName: "管路事件"},
          eventServiceName: 'getTubeEventData',
          eventCode: '153'
        });
      }
    }, err => {
      this.showToast('上报失败999', 'middle');
    });
  }

  getTheMonth() {
    let time = '';
    let temp = this.glData.HappenedDate.split('-');
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

  //清除并发症选无后已选择的数据
  selectComplication(item) {
    // if((item.ECodeValue === '112')&&(item.isChecked))
    // {
    //   this.isShowComplicationEditor=true;
    // }
    if (item.ECodeValue === '228') {
      if (item.isChecked) {
        _.each(this.dataSource.complication, (item) => {
          if (item.ECodeValue !== '228') {
            // this.isShowComplicationEditor=false;
            this.glData.ComplicationQt = '';
            item.isDisabled = true;
            item.isChecked = false;
          }
        })
      } else {
        _.each(this.dataSource.complication, (item) => {
          if (item.ECodeValue !== '228') {
            item.isDisabled = false;
          }
        })
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

  showOthersEditor(item,otherDataKey) {
    if (item.ECodeValue === '112') {
      if (item.isChecked) {
      } else {
        this.glData[otherDataKey] = '';
      }
    }
  }

  clearOther(item, otherDataKey) {
    if (this.glData[item] != '112') {
      this.glData[otherDataKey] = '';
    }
  }

  checkTag(dr,otherDataKey) {
    dr.isChecked = !dr.isChecked;
    this.showOthersEditor(dr,otherDataKey);
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

import {Component} from '@angular/core';
import {NavController, NavParams, ToastController, IonicPage, AlertController} from 'ionic-angular';

import {EventReportService} from '../../../providers/eventReportService';
import {HomeService} from '../../../providers/home/HomeService';
import {CommonCheck} from '../../../providers/common/CommonCheck';
import {Util} from '../../../providers/common/util';
import * as formDataConfig from '../../../appConfig/formDataConfig';
import * as _ from 'underscore';

@IonicPage({
  name: 'page-e-fall',
  segment: 'page-e-fall'
})
@Component({
  selector: 'page-e-fall',
  templateUrl: 'e-fall.html',
})


export class EFallPage {
  public userInfo: any = {};
  public hospitalInfo: any = {};
  public submitDisable: boolean = false;
  public fileNames: any = [];
  public ddzcData: any = {
    ExamineState: 0
  };
  public dataSource: any = {};
  public fillStaffName: string = "";
  public fallInvalid: any = {};
  public hurtList: any = {};
  public hurtListArr: any = [];
  public ddzcDataTemp: any = {};
  public maxYear: number = new Date().getFullYear() + 1;
  public minYear: number = new Date().getFullYear() - 1;

  constructor(public navCtrl: NavController, public navParams: NavParams, public eventReportService: EventReportService, public homeService: HomeService, public util: Util, public commonCheck: CommonCheck, public toastCtrl: ToastController, public alertCtrl: AlertController) {
    this.userInfo = this.homeService.userInfo;
    this.hospitalInfo = this.homeService.hospitalInfo;
    this.initForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EFallPage');
  }

  initExamineState() {
    if (this.homeService.right.nurse) {
      this.ddzcData.ExamineState = 0;
    }
    if (this.homeService.right.department) {
      this.ddzcData.ExamineState = 1;
    }
  }

  initForm() {
    this.dataSource = this.util.getDataSource();
    this.ddzcData = this.util.deepCopy(formDataConfig.ddzcData);
    this.fillStaffName = this.hospitalInfo.AersName;
    this.ddzcData.HappenedDate = this.util.getNow();
    this.ddzcData.EvaluateDate = this.util.getNow();
    this.hurtList = this.util.deepCopy(this.dataSource.hurtList);
    this.hurtListArr = this.hurtList.slice(1);//删除第一个选项（无）
    this.initExamineState();
    console.log(this.ddzcData);
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
      console.log(this.ddzcData.HospNumber);
      if (this.commonCheck.isNull(this.ddzcData.HospNumber)) {
        this.showToast('住院号不能为空', 'middle');
        return;
      }
      if (this.commonCheck.wordMaxLength(this.ddzcData.HospNumber, 10)) {
        this.showToast('住院号不能大于十位', 'middle');
        return;
      }
      let PatientAgeZero = false;

      if (this.commonCheck.isNull(this.ddzcData.PatientAge)) {
        this.showToast('患者年龄不能为空', 'middle');
        return;
      }
      PatientAgeZero = ((this.ddzcData.PatientAge == 0) || (this.ddzcData.PatientAge == '0'));
      if (!this.commonCheck.isMinAndMax(this.ddzcData.PatientAge, 0, 4) || PatientAgeZero) {
        this.showToast('患者年龄不能超过4位', 'middle');
        return;
      }

      if (this.commonCheck.isNull(this.ddzcData.Diagnosis)) {
        this.showToast('患者诊断不能为空', 'middle');
        return;
      }
      if (this.commonCheck.wordMaxLength(this.ddzcData.Diagnosis, 1500)) {
        this.showToast('患者诊断不能大于一千五百字', 'middle');
        return;
      }

      if (this.commonCheck.isNull(this.ddzcData.EvaluateScore)) {
        this.showToast('评估分值不能为空', 'middle');
        return;
      }

      if (!this.commonCheck.isMinAndMax(this.ddzcData.EvaluateScore, 0, 100)) {
        this.showToast('请正确输入评估分值', 'middle');
        return;
      }


      if (this.commonCheck.isNull(this.ddzcData.EventDescription)) {
        this.showToast('事件描述不能为空', 'middle');
        return;
      }

      if (this.commonCheck.wordMaxLength(this.ddzcData.EventDescription, 2500)) {
        this.showToast('事件描述不能大于两千五百字', 'middle');
        return;
      }


      if (this.commonCheck.isNull(this.ddzcData.EventLevel)) {
        this.showToast('请选择事件等级', 'middle');
        return;
      }

      this.submitDisable = true;
      this.reportEvent();
    }
  }

  reportEvent() {
    this.ddzcDataTemp = this.util.deepCopy(this.ddzcData);
    if (this.ddzcDataTemp.DdzcType == '242') {
      this.ddzcDataTemp.BedColumnUse = "";
      this.ddzcDataTemp.Restrain = "";
    }
    this.ddzcDataTemp.DzHazards = this.getCheckBoxValue(this.dataSource.dangerReason);
    this.ddzcDataTemp.UseDrug = this.getCheckBoxValue(this.dataSource.medicine);
    this.ddzcDataTemp.GroundState = this.getCheckBoxValue(this.dataSource.groundState);
    this.ddzcDataTemp.DzHandle = this.getCheckBoxValue(this.dataSource.fallDeal);
    var hurtDataList = this.util.deepCopy(this.hurtListArr);
    if (hurtDataList.length > 0) {
      _.each(hurtDataList, function (item) {
        if (!item.isChecked) {
          item.DamageName = '';
        }
      });
    }
    this.ddzcDataTemp.Parts = hurtDataList;
    this.ddzcDataTemp.HappenedDate = this.util.date2str(this.ddzcDataTemp.HappenedDate);
    this.ddzcDataTemp.EvaluateDate = this.util.date2str(this.ddzcDataTemp.EvaluateDate);
    this.ddzcDataTemp.HospDepId = this.userInfo.HospDepId || '';
    this.ddzcDataTemp.HospId = this.userInfo.HospId || '';
    this.ddzcDataTemp.FillStaff = this.userInfo.ReUId || '';
    if(this.ddzcDataTemp.FileNameExist.length>0){
      this.ddzcDataTemp.FileName = JSON.stringify(this.ddzcDataTemp.FileNameExist);
    }else{
      this.ddzcDataTemp.FileName = '';
    }
    this.ddzcDataTemp.Diagnosis = this.util.ReplaceTextarea(this.ddzcDataTemp.Diagnosis);
    this.ddzcDataTemp.EventDescription = this.util.ReplaceTextarea(this.ddzcDataTemp.EventDescription);
    // if (this.fileNames.length == 0) {
    //   this.ddzcDataTemp.FileName = '';
    // }
    console.log(this.ddzcDataTemp);
    this.eventReportService.submitEventFall({model: this.ddzcDataTemp}).subscribe((data: any) => {
      if (data == "104" || data === "") {
        this.showToast('上报失败', 'middle');
      } else {
        this.showToast('上报成功', 'middle');
        this.submitDisable = true;
        // this.initForm();
        console.log(data);
        //跳转后不显示审核按钮
        this.homeService.showState = true;
        this.navCtrl.push('page-audit-detail', {
          eventID: data,
          EveresItem: {},
          eventServiceName: 'getFallEventData',
          eventCode: '152'
        });
      }
    }, err => {
      this.showToast('上报失败', 'middle');
    });
  };

  getTheMonth() {
    let time = '';
    let temp = this.ddzcData.HappenedDate.split('-');
    if (temp.length > 2) {
      time = temp[0] + '-' + parseInt(temp[1], 10) + '-01';
    }
    return time;
  }

  //限制输入框只能输入正整数start
  onlyNumber(obj, attr) {
    this.util.onlyNumber(obj, attr);
  }

  removeE(e) {
    return (/[\d]/.test(String.fromCharCode(e.keyCode)));
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

  showToast(msg, pos) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 1000,
      position: pos
    });
    toast.present();
  }

  checkTag(dr,otherDataKey) {
    dr.isChecked = !dr.isChecked;
    this.showOthersEditor(dr, otherDataKey);
  }

  //清除取消选中后输入的数据
  showOthersEditor (item,otherDataKey) {
  if (item.ECodeValue === '112') {
    if (item.isChecked) {
    } else {
      this.ddzcData[otherDataKey]='';
    }
  }
};

  //开关关闭时清除造成的伤害的数据
  selectHurt(item) {
    if (item.DamageName === '228') {
      if (item.isChecked) {
        _.each(this.hurtListArr, (item) => {
          if (item.DamageName !== '228') {
            item.isDisabled = true;
            item.isChecked = false;
            item.DamageArea = '';
            item.DamageSite = '';
          }
        })
      } else {
        _.each(this.hurtListArr, (item) => {
          if (item.DamageName !== '228') {
            item.isDisabled = false;
          }
        })
      }
    }
  }

  //开关关闭时清除跌倒后的处理内部数据
  selectDeal(item) {
    console.log('cc');
    if (item.ECodeValue === '228') {
      if (item.isChecked) {
        _.each(this.dataSource.fallDeal, (item)=> {
          if (item.ECodeValue !== '228') {
            this.ddzcData.DzHandleQt = '';
            item.isDisabled = true;
            item.isChecked = false;
          }
        })
      } else {
        _.each(this.dataSource.fallDeal, (item)=> {
          if (item.ECodeValue !== '228') {
            item.isDisabled = false;
          }
        })
      }
    }
  }

//开关关闭时清除地面状态里的数据
  selectGroundState(item) {
    if (item.ECodeValue === '275') {
      if (item.isChecked) {
        _.each(this.dataSource.groundState, (item)=> {
          if (item.ECodeValue !== '275') {
            item.isDisabled = true;
            item.isChecked = false;
          }
        })
      } else {
        _.each(this.dataSource.groundState,(item)=>{
          if (item.ECodeValue !== '275') {
            item.isDisabled = false;
          }
        })
      }
    }
  }

//开关关闭时清除使用的药物的数据
  selectMedicine(item) {
    if (item.ECodeValue === '228') {
      if (item.isChecked) {
        _.each(this.dataSource.medicine, (item) => {
          if (item.ECodeValue !== '228') {
            this.ddzcData.UseDrugQt = '';
            item.isDisabled = true;
            item.isChecked = false;
          }
        })
      } else {
        _.each(this.dataSource.medicine, (item) => {
          if (item.ECodeValue !== '228') {
            item.isDisabled = false;
          }
        })
      }
    }
  };

//开关关闭时清除危险因素的数据
  selectDangerReason(item, otherDataKey) {
    if ((item.ECodeValue === '112') && (item.isChecked)) {
      this[otherDataKey] = true;
    }
  }

  //状态改变时初始化其他的值
  clearOther(item, otherDataKey) {
    if (this.ddzcData[item] != '112') {
      this.ddzcData[otherDataKey] = '';
    }
  }

  ionViewWillLeave() {
    this.util.closeMask('ion-alert');
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

import {Injectable,} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import * as dataSourceConfig from '../../appConfig/dataSourceConfig';
import * as _ from 'underscore';

import {CommonService} from '../common/CommonService';
import {Localstorage} from '../common/LocalStorage';

@Injectable()
export class Util {

  constructor(public http: Http, public commonService: CommonService, public localStorage: Localstorage) {
  }

  deepCopy(data): any {
    return JSON.parse(JSON.stringify(data));
  }

  formatData(adds, dataSource, category) {
    var attached = this.deepCopy(_.filter(dataSource, function (item) {
      return _.contains(['112', '228'], item.ECodeValue);
    }));

    var dataGroupByClassify = this.deepCopy(_.filter(dataSource, function (item) {
      return item.Classify === category;
    }));

    if (adds) {
      _.each(adds, function (item) {
        _.each(attached, function (attachedItem) {
          if (item === attachedItem.ECodeValue) {
            attachedItem.Classify = category;
            attachedItem.ECodeValue === '228' ? dataGroupByClassify.splice(0, 0, attachedItem) : dataGroupByClassify.push(attachedItem);
          }
        });
      });
    }

    if (_.contains([
        'mentalState',
        'fallState',
        'fallPlace',
        'fixedWay',
        'outTubeState',
        'activeAbility',
        'drugWay',
        'patientExpose',
        'exposeTypeOne',
        'eventOtherType',
        'assessment'
      ], category)) {
      dataGroupByClassify = _.map(dataGroupByClassify, function (item) {
        if (item.ECodeValue === '112') {
          item.category = '其他';
        } else {
          item.category = '常规';
        }
        return item;
      });
    }

    if (_.contains(['exposeTypeOne'], category)) {
      dataGroupByClassify = _.map(dataGroupByClassify, function (item) {
        if (_.contains(['389', '390', '391'], item.ECodeValue)) {
          item.category = '接触暴露';
        } else if (_.contains(['392', '393', '394'], item.ECodeValue)) {
          item.category = '针刺伤 锐器伤';
        } else if (_.contains(['395', '396'], item.ECodeValue)) {
          item.category = '咬伤 抓伤';
        } else if (item.ECodeValue === '112') {
          item.category = '其它';
        }
        return item;
      });
    }

    if (_.contains(['dangerReason', 'medicine', 'groundState', 'fallDeal', 'complication'], category)) {
      dataGroupByClassify = _.map(dataGroupByClassify, function (item) {
        item.isChecked = false;

        return item;
      });
    }

    if (category === 'hurtList') {
      var hurtList = [];
      _.each(dataGroupByClassify, function (item) {
        var hurtItem = _.extend({}, dataSourceConfig.HURT_ITEM);
        hurtItem.DamageName = item.ECodeValue;
        hurtItem.Text = item.ECodeTag;
        hurtItem.isDisabled = false;
        hurtItem.isChecked = false;
        hurtList.push(hurtItem);
      });

      dataGroupByClassify = hurtList;
    }

    if (category === 'tube') {
      dataGroupByClassify = _.map(dataGroupByClassify, function (item) {
        if (item.ECodeValue === '112') {
          item.category = '其他';
        } else if (_.contains(['169', '170', '171', '172', '173', '174', '175', '176', '177', '178', '179', '180', '181', '182', '183', '184'], item.ECodeValue)) {
          item.category = 'I类管路';
        } else if (_.contains(['185', '186', '187', '188', '189'], item.ECodeValue)) {
          item.category = 'II类管路';
        } else if (_.contains(['190', '191'], item.ECodeValue)) {
          item.category = 'III类管路';
        }
        return item;
      });
    }

    return dataGroupByClassify;
  };


  getDataSource() {
    var dataSource = JSON.parse(this.localStorage.getItem('BUZZLY_data_source'));
    var dataFormat = {
      mentalState: this.formatData(['112'], dataSource, 'mentalState'),
      fallState: this.formatData(['112'], dataSource, 'fallState'),
      fallPlace: this.formatData(['112'], dataSource, 'fallPlace'),
      selfLifeAbility: this.formatData('', dataSource, 'selfLifeAbility'),
      outTubeReason: this.formatData('', dataSource, 'outTubeReason'),
      otherReason: this.formatData(['112'], dataSource, 'otherReason'),
      limited: this.formatData('', dataSource, 'limited'),
      fallHistory: this.formatData(['228'], dataSource, 'fallHistory'),
      groundState: this.formatData('', dataSource, 'groundState'),
      dangerReason: this.formatData(['112'], dataSource, 'dangerReason'),
      medicine: this.formatData(['112', '228'], dataSource, 'medicine'),
      complication: this.formatData(['112', '228'], dataSource, 'complication'),
      fallDeal: this.formatData(['112', '228'], dataSource, 'fallDeal'),
      education: this.formatData(['112'], dataSource, 'education'),
      position: this.formatData('', dataSource, 'position'),
      staffType: this.formatData(['112'], dataSource, 'staffType'),
      fallType: this.formatData('', dataSource, 'fallType'),
      patientSex: this.formatData('', dataSource, 'patientSex'),
      patientAgeUnit: this.formatData('', dataSource, 'patientAgeUnit'),
      isOrNot: this.formatData('', dataSource, 'isOrNot'),
      indoorState: this.formatData('', dataSource, 'indoorState'),
      bedColumnUse: this.formatData('', dataSource, 'bedColumnUse'),
      hurtList: this.formatData(['112', '228'], dataSource, 'hurtList'),
      eventType: this.formatData('', dataSource, 'eventType'),
      workYear: this.formatData('', dataSource, 'workYear'),
      eventOtherType: this.formatData(['112'], dataSource, 'eventOtherType'),
      fixedWay: this.formatData(['112'], dataSource, 'fixedWay'),
      outTubeState: this.formatData(['112'], dataSource, 'outTubeState'),
      activeAbility: this.formatData(['112'], dataSource, 'activeAbility'),
      tube: this.formatData(['112'], dataSource, 'tube'),
      drugWay: this.formatData(['112'], dataSource, 'drugWay'),
      patientExpose: this.formatData(['228', '112'], dataSource, 'patientExpose'),
      exposeTypeOne: this.formatData(['112'], dataSource, 'exposeTypeOne'),
      harmDegree: this.formatData('', dataSource, 'harmDegree'),
      fomesFrom: this.formatData('', dataSource, 'fomesFrom'),
      period: this.formatData('', dataSource, 'period'),
      outComeState: this.formatData(['112'], dataSource, 'outComeState'),
      injuryDegree: this.formatData('', dataSource, 'injuryDegree'),

      exposeUseDrug: this.formatData(['112'], dataSource, 'exposeUseDrug'),


      assessment: this.formatData(['112'], dataSource, 'assessment'),
      highRiskGrade: this.formatData('', dataSource, 'highRiskGrade'),
      takePrevent: this.formatData(['112', '228'], dataSource, 'takePrevent'),
      eventLevel: {},
      nurseLevel: {}

    };
    var level = this.formatData('', dataSource, 'level');

    var eventLevelData = this.deepCopy(level);
    _.each(level, function (item, $index) {
      if (item.ECodeValue === '132') {
        eventLevelData.splice($index, 1);
      }
    });

    eventLevelData = _.sortBy(eventLevelData, 'ECodeTag');

    _.each(eventLevelData, function (eld) {
      _.each(dataSourceConfig.E_REPORT.eventLevel, function (dee) {
        if (eld.ECodeValue === dee.ECodeValue) {
          eld = _.extend(eld, dee);
        }
      });
    });

    dataFormat.eventLevel = eventLevelData;

    var nurseLevelData = this.deepCopy(level);
    _.each(level, function (item, $index) {
      if (item.ECodeValue === '122') {
        nurseLevelData.splice($index, 1);
      }
    });

    dataFormat.nurseLevel = nurseLevelData;

    /*sort workYear start*/
    var tempWorkYear = this.deepCopy(dataFormat.workYear);
    let workYearDealed = [];
    for (var i = 0; i < tempWorkYear.length; i++) {
      switch (tempWorkYear[i].ECodeTag) {
        case '实习生':
          workYearDealed[0] = tempWorkYear[i];
          break;
        case '一年以内':
          workYearDealed[1] = tempWorkYear[i];
          break;
        case '1~5年':
          workYearDealed[2] = tempWorkYear[i];
          break;
        case '5~10年':
          workYearDealed[3] = tempWorkYear[i];
          break;
        case '10~15年':
          workYearDealed[4] = tempWorkYear[i];
          break;
        case '15~20年':
          workYearDealed[5] = tempWorkYear[i];
          break;
        case '20~25年':
          workYearDealed[6] = tempWorkYear[i];
          break;
        case '25年以上':
          workYearDealed[7] = tempWorkYear[i];
          break;
      }
    }
    dataFormat.workYear = this.deepCopy(workYearDealed);
    /*sort workYear end*/


    return dataFormat;
  }

  onlyNumber(obj, attr) {
    if (obj[attr] == undefined) {
      return;
    }
    obj[attr] = obj[attr].replace(/[^\d]/g, ""); //把非数字的都替换掉
  }

  //限制输入框只能输入整数或者小数start
  clearNoNum(obj, attr) {
    obj[attr] = obj[attr].replace(/[^\d.]/g, ""); //先把非数字的都替换掉，除了数字和.
    obj[attr] = obj[attr].replace(/^\./g, ""); //必须保证第一个为数字而不是.
    obj[attr] = obj[attr].replace(/\.{2,}/g, ""); //保证只有出现一个.而没有多个.
    obj[attr] = obj[attr].replace(".", "$#$").replace(/\./g, "").replace("$#$", "."); //保证.只出现一次，而不能出现两次以上
  }

  //限制输入框只能输入整数或者小数end,
  dateFormat(date, fmt) {
    //  var fmt = 'yyyy-MM-dd hh:mm:ss';
    //var fmt='yyyy-MM-dd';
    var o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
    return fmt;
  }

  //获取所在年月及当月第一天
  getThisMonthDay() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var dateStr = year + '-' + month + '-' + '01';
    return dateStr;
  }

  //获取所在年月的上个月
  getLastMonthDay(DateTime) {
    let dateStr = '';
    let date = new Date(DateTime);
    let year = date.getFullYear();
    let month = date.getMonth();
    if (month == 0) {
      month = 12;
      dateStr = year - 1 + '-' + month + '-' + '01';
    } else {
      dateStr = year + '-' + month + '-' + '01';
    }
    return dateStr;
  }

  //获取所在年第一天
  getFirstDay() {
    var date = new Date();
    var year = date.getFullYear();
    var dateStr = year + '-01-01';
    return dateStr;
  }

  getNow() {
    return this.dateFormat(new Date(), 'yyyy-MM-dd') + "T" + this.dateFormat(new Date(), 'hh:mm:ss');
  }

  getCheckBoxValue(dataSource) {
    return JSON.stringify(_.map(_.filter(dataSource, function (item) {
      return item.isChecked;
    }), function (item) {
      return item.ECodeValue;
    }));
  }

  setSideBarStyle() {
    // $(document).ready(function() {
    //     $('#am_admin_sidebar').css('min-height', (window.screen.height - 270) + 'px');
    //     $('#big-box').css('min-height', (window.screen.height - 170) + 'px');
    // });
  }

  getHttpRequestConfig(method, data, url) {
    // var requestConfig = {};
    // requestConfig.method = method;
    // if (data) {
    //     if (method === 'get') {
    //         url += '?';
    //         for (var key in data) {
    //             url += key + '=' + data[key] + '&';
    //         }

    //         url = url.substring(0, url.length - 1);


    //     } else if (method === 'post') {
    //         requestConfig.data = data;
    //     }
    // }

    // requestConfig.url = url;

    // return requestConfig;
  }

  str2date(time, format) {
    var t = new Date(parseInt(time.replace('\/Date(', "").replace('+0800)\/', "")));
    var tf = function (i) {
      return (i < 10 ? '0' : '') + i
    };

    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
      switch (a) {
        case 'yyyy':
          return tf(t.getFullYear());
        case 'MM':
          return tf(t.getMonth() + 1);
        case 'mm':
          return tf(t.getMinutes());
        case 'dd':
          return tf(t.getDate());
        case 'HH':
          return tf(t.getHours());
        case 'ss':
          return tf(t.getSeconds());
        default :
          break;
      }
    });
  }

  replaceDate(str) {
    if (str !== '') {
      var odt = str.replace(new RegExp('-', 'g'), '/');
      var odt2 = odt.replace(/T/, " ");
      return str = odt2.replace(/Z/, " ");
    }
  }

  date2str(str) {
    var dt = new Date();
    if (str !== '')
      var odt = str.replace(new RegExp('-', 'g'), '/');
    var odt2 = odt.replace(/T/, " ");
    dt = new Date(odt2.replace(/Z/, " "));
    return '\/Date(' + dt.getTime() + '+0800)\/';
  }

  ReplaceTextarea(str) {
    var reg = new RegExp("\r\n", "g");
    var reg1 = new RegExp("\n", "g");

    str = str.replace(reg, "＜br＞");
    str = str.replace(reg1, "＜p＞");

    return str;
  }

  ReplaceTextareaBack(str) {
    if ((str == null) || (str == undefined)) {
      return '';
    }
    var reg = new RegExp("＜br＞", "g");
    var reg1 = new RegExp("＜p＞", "g");

    str = str.replace(reg, "\r\n");
    str = str.replace(reg1, "\n");
    str = str.split("<br>").join("\n");
    str = str.split("<p>").join("\n");

    return str;
  }

  getEventShowData(data, eventCode) {
    var dataSource = this.getDataSource();
    var showData = {};

    for (var key in data) {
      if (key === 'DdzcType') {
        showData[key] = this.getSingleData(data[key], dataSource.fallType);
      } else if (key === 'PatientSex') {
        showData[key] = this.getSingleData(data[key], dataSource.patientSex);
      } else if (key === 'NursLevel') {
        showData[key] = this.getSingleData(data[key], dataSource.nurseLevel);
      } else if (_.contains(['IsEvaluate', 'EscortState', 'ResetGl', 'TouchPatient', 'PharmacyState', 'PutDrugs', 'Dispensation', 'PDAState', 'IsEdema', 'HighRiskLevel'], key)) {
        showData[key] = this.getSingleData(data[key], dataSource.isOrNot);
      } else if (_.contains(['HappenedDate', 'SendtoDate', 'OperatorDate', 'EvaluateDate', 'InGlTime'], key)) {
        showData[key] = this.str2date(data[key], 'yyyy-MM-dd HH:mm:ss');
      } else if (key === 'DzPlace') {
        showData[key] = this.getSingleData(data[key], dataSource.fallPlace);
        if (data[key] == '112') {
          showData[key] = data['DzPlaceQt'];
        }
      } else if (key === 'DzState') {
        showData[key] = this.getSingleData(data[key], dataSource.fallState);
        if (data[key] == '112') {
          showData[key] = data['DzStateQt'];
        }
      } else if (key === 'MentalState') {
        showData[key] = this.getSingleData(data[key], dataSource.mentalState);
        if (data[key] == '112') {
          showData[key] = data['MentalStateQt'];
        }
      } else if (key === 'SelfcareState') {
        showData[key] = this.getSingleData(data[key], dataSource.selfLifeAbility);
      } else if (key === 'Degreeinjury') {
        showData[key] = this.getSingleData(data[key], dataSource.injuryDegree);
      } else if (key === 'EventDescription') {
        showData[key] = this.ReplaceTextareaBack(data[key]);
      } else if (key === 'Diagnosis') {
        showData[key] = this.ReplaceTextareaBack(data[key]);
      } else if (key === 'ActivityAbility') {
        showData[key] = this.getSingleData(data[key], dataSource.activeAbility);
        if (data[key] == '112') {
          showData[key] = data['ActivityAbilityQt'];
        }
      } else if (key === 'DzHistory') {
        showData[key] = this.getSingleData(data[key], dataSource.fallHistory);
      } else if (key === 'IndoorState') {
        showData[key] = this.getSingleData(data[key], dataSource.indoorState);
      } else if (key === 'Restrain') {
        showData[key] = this.getSingleData(data[key], dataSource.limited);
      } else if (key === 'BedColumnUse') {
        showData[key] = this.getSingleData(data[key], dataSource.bedColumnUse);
      } else if (key === 'StaffType') {
        showData[key] = this.getSingleData(data[key], dataSource.staffType);
        if (data[key] == '112') {
          showData[key] = data['StaffTypeQt'];
        }
      } else if (key === 'StaffPosition') {
        showData[key] = this.getSingleData(data[key], dataSource.position);
      } else if (key === 'StaffEducation') {
        showData[key] = this.getSingleData(data[key], dataSource.education);
        if (data[key] == '112') {
          showData[key] = data['StaffEduQt'];
        }
      } else if (key === 'StaffWorkyears') {
        showData[key] = this.getSingleData(data[key], dataSource.workYear);
      } else if (key === 'EventLevel') {
        showData[key] = this.getSingleData(data[key], dataSource.eventLevel);
      } else if (key === 'GlTypeOne') {
        showData[key] = this.getSingleData(data[key], dataSource.tube);
        if (data[key] == '112') {
          showData[key] = data['GlTypeOneQt'];
        }
      } else if (key === 'FixedWay') {
        showData[key] = this.getSingleData(data[key], dataSource.fixedWay);
        if (data[key] == '112') {
          showData[key] = data['FixedWayQt'];
        }
      } else if (key === 'OutGlState') {
        showData[key] = this.getSingleData(data[key], dataSource.outTubeState);
        if (data[key] == '112') {
          showData[key] = data['OutGlStateQt'];
        }
      } else if (key === 'OutGlReason') {
        showData[key] = this.getSingleData(data[key], dataSource.outTubeReason);
      } else if (key === 'OtherReasons') {
        showData[key] = this.getSingleData(data[key], dataSource.otherReason);
        if (data[key] == '112') {
          showData[key] = data['OtherReasonsQt'];
        }
      } else if (key === 'DzHazards') {
        showData[key] = this.getMultipleData(JSON.parse(data[key]), dataSource.dangerReason);
        showData[key] = showData[key].split('其他')[0] + (data['DzHazardsQt']);
      } else if (key === 'DzHandle') {
        showData[key] = this.getMultipleData(JSON.parse(data[key]), dataSource.fallDeal);
        showData[key] = showData[key].split('其他')[0] + (data['DzHandleQt']);
      } else if (key === 'UseDrug') {
        showData[key] = this.getMultipleData(JSON.parse(data[key]), dataSource.medicine);
        showData[key] = showData[key].split('其他')[0] + (data['UseDrugQt']);
        if ((showData[key] === '') || (showData[key] === 'null')) {
          showData[key] = this.getMultipleData(JSON.parse(data[key]), dataSource.exposeUseDrug);
        }
      } else if (key === 'GroundState') {
        showData[key] = this.getMultipleData(JSON.parse(data[key]), dataSource.groundState);
      } else if (key === 'Complication') {
        showData[key] = this.getMultipleData(JSON.parse(data[key]), dataSource.complication);
        showData[key] = showData[key].split('其他')[0] + (data['ComplicationQt']);
      } else if (key === 'PatientExpose') {
        showData[key] = this.getSingleData(data[key], dataSource.patientExpose);
        if (data[key] == '112') {
          showData[key] = data['PatientExposeQt'];
        }
      } else if (key === 'ExposeTypeOne') {
        showData[key] = this.getSingleData(data[key], dataSource.exposeTypeOne);
        if (data[key] == '112') {
          showData[key] = data['ExposeTypeOneQt']
        }
      } else if (key === 'HarmDegree') {
        showData[key] = this.getSingleData(data[key], dataSource.harmDegree);
        if (data[key] == '310') {
          showData[key] = data['DegreeDamage'];
        }
      } else if (key === 'FomesFrom') {
        showData[key] = this.getSingleData(data[key], dataSource.fomesFrom);
      } else if (key === 'IsTakePrevent') {
        showData[key] = this.getSingleData(data[key], dataSource.isOrNot);
        if ((showData[key] === '') || (showData[key] === 'null')) {
          showData[key] = this.getMultipleData(JSON.parse(data[key]), dataSource.takePrevent);
          showData[key] = showData[key].split('其他')[0] + (data['TakePreventQt']);
        }
      } else if (key === 'DetailType') {
        showData[key] = this.getSingleData(JSON.parse(data[key]), dataSource.eventOtherType);
        if ((data['DetailTypeQt'] != null) && (data['DetailTypeQt'] != '')) {
          showData[key] = showData[key] + '(' + data['DetailTypeQt'] + ')';
        }
      } else if (key === 'SelfcareAbility') {
        showData[key] = this.getSingleData(JSON.parse(data[key]), dataSource.selfLifeAbility);
      } else if (key === 'PatientAge') {
        showData[key] = data[key] + ' ' + this.getSingleData(data['PatientAgeUnit'], dataSource.patientAgeUnit);
      } else if (key === 'Highriskgrade') {
        showData[key] = this.getSingleData(data['Highriskgrade'], dataSource.highRiskGrade);
      } else if (key === 'OutcomeState') {
        showData[key] = this.getSingleData(data['OutcomeState'], dataSource.outComeState);
        if (data['OutcomeState'] == '112') {
          showData[key] = data['OutcomeQt'];
        }
      } else if (key === 'Assessment') {
        showData[key] = this.getSingleData(data['Assessment'], dataSource.assessment);
        if (data['Assessment'] == '112') {
          showData[key] = data['AssessmentOther'];
        }
      } else if (key === 'Parts' && eventCode === '152') {
        var parts = '';
        _.each(data[key], function (item) {
          if (item.DamageName) {
            _.each(dataSource.hurtList, function (hurt) {
              if (item.DamageName === hurt.DamageName) {
                parts += hurt.Text + ' ';
                if (item.DamageSite) {
                  parts += item.DamageSite + ' ';
                }
                if (item.DamageArea) {
                  parts += item.DamageArea + 'cm²';
                }
                parts += '，'
              }
            });
          }
        });
        showData[key] = parts.substring(0, parts.length - 1);
      } else if (key === 'Parts' && eventCode === '149') {
        var tempParts = this.deepCopy(data[key]);
        for (var i = 0; i < tempParts.length; i++) {
          for (let childKey in tempParts[i]) {
            if (childKey === 'Staging') {
              tempParts[i][childKey] = this.getSingleData(JSON.parse(tempParts[i][childKey]) + '', dataSource.period);
            }
          }
        }
        showData[key] = tempParts;
      } else {
        showData[key] = data[key];
      }
    }

    return showData;
  }

  alertInIphone(invalidObject) {
    if (invalidObject) {
      var appVersion = navigator.appVersion;
      var zz = new RegExp('iPhone', 'g');
      if (zz.test(appVersion)) {
        // $modal.open({
        //     template: 'alertInIphne'
        // });
      }
    }
  }

  downloadFile(url, filename) {
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    if (document.all) {
      a.click();
    } else {
      var evt = document.createEvent("MouseEvents");
      evt.initEvent("click", true, true);
      a.dispatchEvent(evt);
    }

  }

  toMobileSite(f)  //f is targetURL
  {
    try {
      if (document.getElementById("bdmark") != null) {
        return
      }
      var b = false;
      if (arguments[1]) {
        // var e = window.location.host;
        // var a = window.location.href;
        // if (isSubdomain(arguments[1], e) == 1) {
        //     f = f + "/#m/" + a;
        //     b = true
        // } else {
        //     if (isSubdomain(arguments[1], e) == 2) {
        //         f = f + "/#m/" + a;
        //         b = true
        //     } else {
        //         f = a;
        //         b = false
        //     }
        // }
      } else {
        b = true
      }
      if (b) {
        var c = window.location.hash;
        if (!c.match("fromapp")) {
          if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|SymbianOS)/i))) {
            location.replace(f)
            // Location.replace()方法以给定的URL来替换当前的资源。 与assign() 方法 不同的是调用replace()方法后，当前页面不会保存到会话历史中（session History），这样用户点击回退按钮将不会再跳转到该页面。
          }
        }
      }
    } catch (d) {

    }
  }

  getSingleData(key, dataSource) {
    var name = '';
    _.each(dataSource, function (item) {
      if (key == item.ECodeValue) {
        name = item.ECodeTag;
      }
    });

    return name;
  };

  getMultipleData(keys, dataSource) {
    var name = '';
    _.each(dataSource, function (item) {
      if (_.contains(keys, item.ECodeValue)) {
        name += item.ECodeTag + ','
      }
    });

    return name.substring(0, name.length - 1);
  };

  closeMask(tag: any) {
    // console.log(tag);
    // var pnode = document.getElementsByTagName(tag)[0];
    // var childs=pnode.childNodes;
    //
    // for(let i=childs.length-1;i>=0;i--){
    //   pnode.removeChild(childs.item(i));
    // }
    // let _parentElement = document.querySelector(tag).parentNode;
    // if(_parentElement){
    //   _parentElement.removeChild(alert);
    // }
  };


}

import { Component } from '@angular/core';
import { Platform , ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Localstorage} from "../providers/common/LocalStorage";
import {CommonService} from "../providers/common/CommonService";
import {HomeService} from "../providers/home/HomeService";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = "";
  public loginData:any = {Ruid:"ru00000002"};
  public returndata:any ={};

  constructor(public localstorage: Localstorage,public commonService: CommonService,public homeService:HomeService,public platform: Platform, public toastCtrl: ToastController,statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.returndata = this.getUrlStr();
      let Ruid = this.returndata.Ruid;
      if(Ruid){
        this.loginData={Ruid:Ruid};
      }
      this.setUserData();
      console.log(Ruid);

    });
  }

  setUserData(){
    this.homeService.login({model:this.loginData}).subscribe((resLogin:any) => {
      if(resLogin.restag === "103"){
        this.homeService.userInfo = resLogin.model;
        this.commonService.getHospitalInfo({rud: resLogin.model.ReUId}).subscribe((resHosp:any) => {
          this.localstorage.setItem('BUZZLY_hospital_info',JSON.stringify(resHosp[0]));
          this.homeService.hospitalInfo = resHosp[0];//获取上报人
          this.getUserRight();//判断权限
        });
        this.commonService.getDataSource("").subscribe((resData:any) => {
          this.localstorage.setItem('BUZZLY_data_source',JSON.stringify(resData));
          this.localstorage.setItem('BUZZLY_user_info',JSON.stringify(resLogin.model));
        });

      }else{
        this.showToast('网络故障，请重试','middle');
        return;
      }
    }, err => {
      this.showToast('请检查网络', 'middle');
      return;
    });
  }

  getUrlStr() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      var strs = str.split("&");
      for(let i = 0; i < strs.length; i ++) {
        theRequest[strs[i].split("=")[0]]=strs[i].split("=")[1];
      }
    }
    return theRequest;
  }

  getUserRight() {
    let fromUser=this.returndata.from;
    if(fromUser){
      this.homeService.showState=true;
      // this.navCtrl.push(EventAllListPage);
      this.rootPage="page-event-all-list";
    }else{
      console.log(this.homeService.userInfo.GroupRole);
      let roles = this.homeService.userInfo.GroupRole.split('|');
      for(var i=0;i<roles.length;i++)
      {
        switch(roles[i])
        {
          case '145':this.homeService.right.department=true;
            // this.navCtrl.push("page-event-audit");
            this.rootPage="page-event-audit";
            break;
          case '146':this.homeService.right.nurse=true;
            // this.navCtrl.push(EventReportPage);
            this.homeService.fromIndex=true;
            this.rootPage="page-event-report";
            break;
          case '147':this.homeService.right.province=true;
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

  showToast(msg,pos){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 1000,
      position: pos
    });
    toast.present();
  }

}


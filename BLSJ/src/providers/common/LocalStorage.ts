import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
// import {Storage} from '@ionic/storage';
import { CommonService } from './CommonService';




@Injectable()
export class Localstorage {
  constructor(public http: Http,public commonService: CommonService) {
    }

    // //store the email address
    // setItem(key,value){

    //     let val = this.commonService.base64encode(this.commonService.utf16to8(value));
    //     let key64 = this.commonService.base64encode(this.commonService.utf16to8(key));
    //     localStorage.setItem(key64,val);
    // }

    // //get the stored email
    // getItem(key){
    //  let back = this.commonService.base64encode(this.commonService.utf16to8(key));
    //  if(localStorage.getItem(back) !== null){
    //    return   this.commonService.utf8to16(this.commonService.base64decode(localStorage.getItem(back)));
    //  }else{
    //    return null;
    //  }
      
    // }

    // //delete the email address
    // removeItem(key){
    //   let back = this.commonService.base64encode(this.commonService.utf16to8(key));
    //   return   localStorage.removeItem(back);
    // }

    // //clear the whole local storage
    // clearItem(){
    //     localStorage.clear();
    // }

    //store the email address
    setItem(key,value){

        localStorage.setItem(key,value);
    }

    //get the stored email
    getItem(key){

     return localStorage.getItem(key);
      
    }

    //delete the email address
    removeItem(key){
      return   localStorage.removeItem(key);
    }

    //clear the whole local storage
    clearItem(){
        localStorage.clear();
    }    

}

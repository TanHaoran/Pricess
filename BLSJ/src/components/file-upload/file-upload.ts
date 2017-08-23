import {Component, Input} from '@angular/core';
import { RequestOptions, Headers} from '@angular/http';
import {ToastController,IonicPage} from 'ionic-angular';
import {Util} from '../../providers/common/util';
import {EventReportService} from '../../providers/eventReportService';
import {CommonCheck} from '../../providers/common/CommonCheck';

@IonicPage({
  name: 'file-upload',
  segment: 'file-upload'
})
@Component({
  selector: 'file-upload',
  templateUrl: 'file-upload.html'
})
export class FileUploadComponent {
  @Input() data: any = {};
  text: string;
  public fileArr: any = [];
  public uploadFlag: boolean = false;

  constructor(public util: Util, public eventReportService: EventReportService, public toastCtrl: ToastController, public commonCheck: CommonCheck) {

  }

  chooseFile(e) {
    if (!e.target.files[0]) {
      this.showToast('文件加载出错,请重新选择', 'middle');
      return;
    }
    var filecheck = this.commonCheck.uploadFilecheck(e.target.files[0]);

    if (filecheck == "filewrong") {
      this.showToast('文件格式不正确', 'middle');
      return;
    }
    // let url = window.URL.createObjectURL(e.target.files[0]);
    // console.log(url);
    // let fileList: FileList = e.target.files;
    this.fileArr.push(e.target.files);
    console.log(this.fileArr);
    this.uploadFlag=true;
  }


  delFile(i) {
    this.fileArr.splice(i, 1);
    console.log(this.fileArr);
  }


  uploadFile(e) {

    // if(!e.target.files[0]){
    //   this.showToast('文件加载出错,请重新选择','middle');
    //   return;
    // }
    // var filecheck = this.commonCheck.uploadFilecheck(e.target.files[0]);
    //
    // if(filecheck == "filewrong"){
    //   this.showToast('文件格式不正确','middle');
    //   return;
    // }
    // let url = window.URL.createObjectURL(e.target.files[0]);

    // 防止连续上传
    if (this.uploadFlag) {
      this.uploadFlag = false;
      for (let i = 0; i < this.fileArr.length; i++) {
        let fileList: FileList = this.fileArr[i];
        if (fileList.length > 0) {
          let file: File = fileList[0];
          let formData: FormData = new FormData();
          formData.append('fileToUpload', file);

          let headers = new Headers();
          headers.append('Accept', '*/*');
          let options = new RequestOptions({headers: headers});
          this.eventReportService.imgHandler(formData, options).subscribe((data: any) => {
            let returnName = data.text();
            if (returnName == '') {
              this.showToast('文件上传失败', 'middle');
              return;
            }
            else {
              let tempObj: any = {};
              tempObj.FileNameServer = returnName;
              tempObj.FileNameUser = file.name;
              this.data.FileNameExist.push(tempObj.FileNameServer);
              if (i == this.fileArr.length - 1) {
                this.showToast('文件上传成功', 'middle');
                this.uploadFlag = false;
              }
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

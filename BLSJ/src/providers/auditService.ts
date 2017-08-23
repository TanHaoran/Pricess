import { Injectable ,} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as interfaceConfig from '../appConfig/interfaceConfig';
import {Observable} from 'rxjs/Rx';

import { CommonService } from './common/CommonService';

@Injectable()
export class AuditService {

	constructor(public http:Http,public commonService:CommonService) {}
  // getAllEvent(data):Observable<any>{
  //   return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.LOAD_EVENT_LIST.ALL)).map((res:any)=> {
  //     return res.json();
  //   });
  // }

	getUncheckedEvent(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.LOAD_EVENT_LIST.WAIT)).map((res:any)=> {
			return res.json();
		});
	}
	getPassedEvent(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.LOAD_EVENT_LIST.PASS)).map((res:any)=> {
			return res.json();
		});
	}
	getNotPassedEvent(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.LOAD_EVENT_LIST.NOT_PASS)).map((res:any)=> {
			return res.json();
		});
	}
	//获取指定用户下的所有上报记录
  getAllEvent(data):Observable<any> {
    return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.LOAD_EVENT_LIST.ALL)).map((res:any)=> {
      return res.json();
    });
  }

  //获取医院的审核通过和未通过的记录
  getHospEvent(data):Observable<any> {
    return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.LOAD_EVENT_LIST.RECORD)).map((res:any)=> {
      return res.json();
    });
  }
	getUncheckedEventExcel(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.LOAD_EVENT_LIST_EXCEL.WAIT)).map((res:any)=> {
			return res.json();
		});
	}
	getPassedEventExcel(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.LOAD_EVENT_LIST_EXCEL.PASS)).map((res:any)=> {
			return res.json();
		});
	}
	getNotPassedEventExcel(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.LOAD_EVENT_LIST_EXCEL.NOT_PASS)).map((res:any)=> {
			return res.json();
		});
	}
	passEvent(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.LOAD_EVENT_LIST.PASS_EVENT)).map((res:any)=> {
			return res.json();
		});
	}
	fadeBackEvent(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.LOAD_EVENT_LIST.FADE_BACK_EVENT)).map((res:any)=> {
			return res.json();
		});
	}
	deleteEvent(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.DELETE_EVENT_LIST.DELETE_EVENT)).map((res:any)=> {
			return res.json();
		});
	}


}

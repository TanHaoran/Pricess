import { Injectable ,} from '@angular/core';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
import * as interfaceConfig from '../appConfig/interfaceConfig';
import {Observable} from 'rxjs/Rx';

import { CommonService } from './common/CommonService';

@Injectable()
export class LoadEventDataService {

	constructor(public http:Http,public commonService:CommonService) {}


	// JSONP
	// getCourseList(data):Observable<any> {
	// 	let url = this.commonService.getHttpRequestConfig('get',data,interfaceConfig.GET_COURSE_LIST);
	// 	var params = new URLSearchParams();
	// 	params.set("callback", "JSONP_CALLBACK");
	// 	// params.set("callback", "__ng_jsonp__.__req0.finished");
	// 	// params.set("callback", "__ng_jsonp__.__req1.finished");
	// 	return this.jsonp.get(url, params).map((res:any)=> {
	// 		return this.transferImgUrl(res.json());
	// 	});
	// }


	getPressureulcersEventData(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.LOAD_EVENT_DATA.PRESSURE_ULCERS)).map((res:any)=> {
			return res.json();
		});
	}
	getOrtherEventData(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.LOAD_EVENT_DATA.OTHERS)).map((res:any)=> {
			return res.json();
		});
	}
	getZeroEventData(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.LOAD_EVENT_DATA.ZERO)).map((res:any)=> {
			return res.json();
		});
	}
	getFallEventData(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.LOAD_EVENT_DATA.FALL)).map((res:any)=> {
			return res.json();
		});
	}
	getTubeEventData(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.LOAD_EVENT_DATA.TUBE)).map((res:any)=> {
			return res.json();
		});
	}
	getHiddenDangerEventData(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.LOAD_EVENT_DATA.HIDDEN_DANGER)).map((res:any)=> {
			return res.json();
		});
	}
	getMedicineEventData(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.LOAD_EVENT_DATA.MEDICINE)).map((res:any)=> {
			return res.json();
		});
	}
	getOccupationExposeEventData(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.LOAD_EVENT_DATA.OCCUPATION_EXPOSE)).map((res:any)=> {
			return res.json();
		});
	}


	// POST
	// addNote(data):Observable<any> {
	// 	return this.http.post(interfaceConfig.ADD_NOTE,JSON.stringify(data),this.commonService.getHttpRequestConfig('post','','')).map((res:any)=> {
	// 		if(res._body.length > 0){
	// 			return res.json();
	// 		}
	// 	});
	// }

}

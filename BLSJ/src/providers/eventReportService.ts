import { Injectable ,} from '@angular/core';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
import * as interfaceConfig from '../appConfig/interfaceConfig';
import {Observable} from 'rxjs/Rx';

import { CommonService } from './common/CommonService';

@Injectable()
export class EventReportService {

	constructor(public http:Http,public commonService:CommonService) {}

	// transferImgUrl(data){
	// 	return data.map((item:any)=> {
	// 		item.imgUrl =systemParamConfig.SERVER_RES_IMG_HOME +  item.CourseThumb;
	// 		return item;
	// 	});
	// }
	// transferVideo(data){
	// 	return data.map((item:any)=> {
	// 		item.vodUrl =systemParamConfig.SERVER_RES_VOD_HOME +  item.ContentUrl;
	// 		return item;
	// 	});
	// }

	// login(data):Observable<any> {
	// 	return this.http.post(interfaceConfig.LOGIN,JSON.stringify(data),this.commonService.getHttpRequestConfig('post','','')).map((res:any)=> {
	// 		if(res._body.length > 0){
	// 			return res.json();
	// 		}
	// 	});
	// }
	submitEventFall(data):Observable<any> {
		return this.http.post(interfaceConfig.SUBMIT_EVENT.FALL,JSON.stringify(data),this.commonService.getHttpRequestConfig('post','','')).map((res:any)=> {
			if(res._body.length > 0){
				return res.json();
			}
		});
	}
	submitEventMedicine(data):Observable<any> {
		return this.http.post(interfaceConfig.SUBMIT_EVENT.MEDICINE,JSON.stringify(data),this.commonService.getHttpRequestConfig('post','','')).map((res:any)=> {
			if(res._body.length > 0){
				return res.json();
			}
		});
	}
	submitEventTube(data):Observable<any> {
		return this.http.post(interfaceConfig.SUBMIT_EVENT.TUBE,JSON.stringify(data),this.commonService.getHttpRequestConfig('post','','')).map((res:any)=> {
			if(res._body.length > 0){
				return res.json();
			}
		});
	}
	submitEventPressure(data):Observable<any> {
		return this.http.post(interfaceConfig.SUBMIT_EVENT.PRESSURE,JSON.stringify(data),this.commonService.getHttpRequestConfig('post','','')).map((res:any)=> {
			if(res._body.length > 0){
				return res.json();
			}
		});
	}
	submitEventOccupationExpose(data):Observable<any> {
		return this.http.post(interfaceConfig.SUBMIT_EVENT.OCCUPATION_EXPOSE,JSON.stringify(data),this.commonService.getHttpRequestConfig('post','','')).map((res:any)=> {
			if(res._body.length > 0){
				return res.json();
			}
		});
	}
	submitEventOther(data):Observable<any> {
		return this.http.post(interfaceConfig.SUBMIT_EVENT.OTHER,JSON.stringify(data),this.commonService.getHttpRequestConfig('post','','')).map((res:any)=> {
			if(res._body.length > 0){
				return res.json();
			}
		});
	}
	//隐患事件（已废除）
	// submitEventHiddenDanger(data):Observable<any> {
	// 	return this.http.post(interfaceConfig.SUBMIT_EVENT.HIDDENDANGER,JSON.stringify(data),this.commonService.getHttpRequestConfig('post','','')).map((res:any)=> {
	// 		if(res._body.length > 0){
	// 			return res.json();
	// 		}
	// 	});
	// }
	submitEventZero(data):Observable<any> {
		return this.http.post(interfaceConfig.SUBMIT_EVENT.ZERO,JSON.stringify(data),this.commonService.getHttpRequestConfig('post','','')).map((res:any)=> {
			if(res._body.length > 0){
				return res.json();
			}
		});
	}

	imgHandler(formData,options):Observable<any> {
		return this.http.post(interfaceConfig.IMG_HANDLER,formData,options).map((res:any)=> {
			return res;
		});
	}

	// GET
	getOthersSubmitedOrNot(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.SUBMIT_EVENT.ORTHERS_SUBMITED_OR_NOT)).map((res:any)=> {
			return res.json();
		});
	}
	getZeroSubmitedOrNot(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.SUBMIT_EVENT.ZERO_SUBMITED_OR_NOT)).map((res:any)=> {
			return res.json();
		});
	}
	getEventCount(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.LOAD_EVENT_DATA.FALL)).map((res:any)=> {
			return res.json();
		});
	}


	// regist(data):Observable<any> {
	// 	let headers = new Headers();
	// 	headers.append('Content-Type', 'application/json');
	// 	let options: RequestOptions = new RequestOptions();
	// 	options.headers = headers;
	// 	return this.http.post(interfaceConfig.REGIST,JSON.stringify(data),this.commonService.getHttpRequestConfig('post','','')).map((res:any)=> {
	// 		return res.json();
	// 	});
	// }

	// updatePwd(data):Observable<any> {
	// 	return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.UPDATEPWD)).map((res:any)=> {
	// 		return res.json();
	// 	});
	// }

	// forgetPwd(data):Observable<any> {
	// 	return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.FORGETPWD)).map((res:any)=> {
	// 		return res.json();
	// 	});
	// }

	// getSMSCodeSend(data):Observable<any> {
	// 	return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.SMS_CODESEND)).map((res:any)=> {
	// 		return res.json();
	// 	});
	// }

	// getSMSVerification(data):Observable<any> {
	// 	return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.SMS_VERIFICATION)).map((res:any)=> {
	// 		return res.json();
	// 	});
	// }




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


	// GET
	// getCourseListByPaging(data):Observable<any> {
	// 	return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.COURSE_FIND_PAGING)).map((res:any)=> {
	// 		return this.transferImgUrl(res.json());
	// 	});
	// }


	// POST
	// addNote(data):Observable<any> {
	// 	return this.http.post(interfaceConfig.ADD_NOTE,JSON.stringify(data),this.commonService.getHttpRequestConfig('post','','')).map((res:any)=> {
	// 		if(res._body.length > 0){
	// 			return res.json();
	// 		}
	// 	});
	// }

}

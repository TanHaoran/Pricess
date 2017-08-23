import { Injectable,Input,SimpleChange } from '@angular/core';
import { Http,RequestOptions,Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import * as interfaceConfig from '../../appConfig/interfaceConfig';
import {Observable} from 'rxjs/Rx';


@Injectable()
export class CommonService {
  @Input('currentUser')  currentUser:any = {};
  @Input('currentDetails')  currentDetails:any = {};
  toBinaryTable:any = [

    -1,-1,-1,-1, -1,-1,-1,-1, -1,-1,-1,-1, -1,-1,-1,-1,

    -1,-1,-1,-1, -1,-1,-1,-1, -1,-1,-1,-1, -1,-1,-1,-1,

    -1,-1,-1,-1, -1,-1,-1,-1, -1,-1,-1,62, -1,-1,-1,63,

    52,53,54,55, 56,57,58,59, 60,61,-1,-1, -1, 0,-1,-1,

    -1, 0, 1, 2,  3, 4, 5, 6,  7, 8, 9,10, 11,12,13,14,

    15,16,17,18, 19,20,21,22, 23,24,25,-1, -1,-1,-1,-1,

    -1,26,27,28, 29,30,31,32, 33,34,35,36, 37,38,39,40,

    41,42,43,44, 45,46,47,48, 49,50,51,-1, -1,-1,-1,-1

];


 base64EncodeChars:string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
 base64DecodeChars:any = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);



	constructor(public http:Http) {
		this.http = http;
	}

    ngOnChanges(changes: {[propName: string]: SimpleChange}): void {
        console.log('Changes', changes);
    }
    textToJson(data){
        data._body  = JSON.parse(data.text()) ;
        if(data._body.length > 0){
            let b = data.json();
            return b;
        }

    }

    getDataSource(data):Observable<any> {
        return this.http.get(this.getHttpRequestConfig('get',data,interfaceConfig.GET_DATA_SOURCE)).map((res:any)=> {
            return res.json();
        });
    }

    getHospitalInfo(data):Observable<any> {
        return this.http.get(this.getHttpRequestConfig('get',data,interfaceConfig.GET_HOSPITAL_INFO)).map((res:any)=> {
            return this.textToJson(res);
        });
    }

    getHttpRequestConfig(method, data, url) {
        // if (data) {
        //     if (method === 'get') {
        //         url += '?'
        //         for (var key in data) {
        //             url += key + '=' + data[key] + '&';
        //         }

        //         url = url.substring(0, url.length - 1);
        //         return url;

        //     }else if(method === 'post'){
        //         let headers = new Headers();
        //         headers.append('Content-Type', 'application/json');
        //         let options: RequestOptions = new RequestOptions();
        //         options.headers = headers;
        //         return options;
        //     }
        // }else{
        //     return url;
        // }

        if (method === 'get') {
            if(data){
                url += '?';
                for (var key in data) {
                    url += key + '=' + data[key] + '&';
                }
                url = url.substring(0, url.length - 1);
                return url;
            }else {
                return url;
            }
        }else if(method === 'post'){
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            let options: RequestOptions = new RequestOptions();
            options.headers = headers;
            return options;
        }


    }

    dataURLtoBlob(dataurl) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type:mime});
    }

    str2date(time, format) {
        var t = new Date(parseInt(time.replace("\/Date(", "").replace("+0800)\/", "")));
        var tf = function(i) {
            return (i < 10 ? '0' : '') + i
        };

        return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
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
                default:
                break;

            }
        });
    }

                                    date2str(str) {
                                            var dt = new Date();
                                            if (str !== '')
                                                dt = new Date(str.replace(new RegExp('-', 'g'), "/"));
                                            return "\/Date(" + dt.getTime() + "+0800)\/"
                                        }











    // translateServerData(data) {
        //     if (isObject(data)) {
            //         return data;
            //     } else {
                //         return JSON.parse(data);
                //     }
                // }
                // dateFormat(date) {
                    //     var year = date.getFullYear();
                    //     var month = date.getMonth() + 1;
                    //     var day = date.getDay();
                    //     var hours = date.getHours();
                    //     var minutes = date.getMinutes();
                    //     var seconds = date.getSeconds();
                    //     return [year, '/', month, '/', day, ' ', hours, ': ', minutes, ': ', seconds].join('');
                    // }
                    // str2date(time, format) {
                        //     var t = new Date(parseInt(time.replace("\/Date(", "").replace("+0800)\/", "")));
                        //     var tf = function(i) {
                            //         return (i < 10 ? '0' : '') + i
                            //     };

                            //     return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
                                //         switch (a) {
                                    //             case 'yyyy':
                                    //             return tf(t.getFullYear());
                                    //             case 'MM':
                                    //             return tf(t.getMonth() + 1);
                                    //             case 'mm':
                                    //             return tf(t.getMinutes());
                                    //             case 'dd':
                                    //             return tf(t.getDate());
                                    //             case 'HH':
                                    //             return tf(t.getHours());
                                    //             case 'ss':
                                    //             return tf(t.getSeconds());

                                    //         }
                                    //     });
                                    // }





 base64encode(str){
    var out, i, len;
    var c1, c2, c3;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            out += this.base64EncodeChars.charAt(c1 >> 2);
            out += this.base64EncodeChars.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            out += this.base64EncodeChars.charAt(c1 >> 2);
            out += this.base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += this.base64EncodeChars.charAt((c2 & 0xF) << 2);
            out += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        out += this.base64EncodeChars.charAt(c1 >> 2);
        out += this.base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += this.base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += this.base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
}

 base64decode(str){
    var c1, c2, c3, c4;
    var i, len, out;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        /* c1 */
        do {
            c1 = this.base64DecodeChars[str.charCodeAt(i++) & 0xff];
        }
        while (i < len && c1 == -1);
        if (c1 == -1)
            break;
        /* c2 */
        do {
            c2 = this.base64DecodeChars[str.charCodeAt(i++) & 0xff];
        }
        while (i < len && c2 == -1);
        if (c2 == -1)
            break;
        out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
        /* c3 */
        do {
            c3 = str.charCodeAt(i++) & 0xff;
            if (c3 == 61)
                return out;
            c3 = this.base64DecodeChars[c3];
        }
        while (i < len && c3 == -1);
        if (c3 == -1)
            break;
        out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
        /* c4 */
        do {
            c4 = str.charCodeAt(i++) & 0xff;
            if (c4 == 61)
                return out;
            c4 = this.base64DecodeChars[c4];
        }
        while (i < len && c4 == -1);
        if (c4 == -1)
            break;
        out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return out;
}

 utf16to8(str){
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        }
        else
            if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            }
            else {
                out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            }
    }
    return out;
}

 utf8to16(str){
    var out, i, len, c;
    var char2, char3;
    out = "";
    len = str.length;
    i = 0;
    while (i < len) {
        c = str.charCodeAt(i++);
        switch (c >> 4) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                // 0xxxxxxx
                out += str.charAt(i - 1);
                break;
            case 12:
            case 13:
                // 110x xxxx 10xx xxxx
                char2 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                break;
            case 14:
                // 1110 xxxx10xx xxxx10xx xxxx
                char2 = str.charCodeAt(i++);
                char3 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));
                break;
        }
    }
    return out;
}









                                    }

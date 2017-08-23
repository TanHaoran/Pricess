import { Injectable } from '@angular/core';

@Injectable()
export class CommonCheck {

	constructor() {}
	isNull(data){
		if(!data || data.trim().length == 0){
			return true;
		}else {
			return false;
		}
	}
	isPhone(data){
		if(data.length === 11 || /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1})|)+\d{8})$/.test(data)){
			return true;
		}else{
			return false;
		}
	}
	isMinAndMax(data,min,max){
		if(eval(`/^[a-zA-Z0-9.]{${min},${max}}$/`).test(data)){
			return true;
		}else {
			return false;
		}
	}
	isMinAndMaxStr(data,min,max){
		if(eval(`/^.{${min},${max}}$/`).test(data)){
			return true;
		}else {
			return false;
		}
	}
	wordMaxLength(data,max){
	  if(data.length>max){
	    return true;
    }else{
      return false;
    }
  }
	isEqual(val1,val2){
		if(val1 === val2){
			return true;
		}else {
			return false;
		}
	}
	isNoLetter(data){
		if(/^[0-9a-zA-Z]*$/g.test(data)){
			return true;
		}else{
			return false;
		}
	}

	isID(id){
		if(/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(id)){
			return true;
		}else {
			return false;
		}
	}


	isRealName(data){
	 	if(/[\u4e00-\u9fa5]+/.test(data)){
	 		return true;
	 	}else {
	 		return false;
	 	}
	 }

	uploadImgcheck(file)
	{
		var aa=file.name.toLowerCase().split('.');

		if(aa[aa.length-1]=='gif'||aa[aa.length-1]=='jpg'||aa[aa.length-1]=='bmp'

			||aa[aa.length-1]=='png'||aa[aa.length-1]=='jpeg')//判断图片格式
		{
			var imagSize =  file.size;
			if(imagSize<1024*1024*10){
				return 'ok';
			}else{
				return 'sizeOver';
			}

		}
		else
		{
			// alert('请选择格式为*.jpg、*.gif、*.bmp、*.png、*.jpeg 的图片');

			return 'picwrong';
		}

	}

	uploadFilecheck(file)
	{
		var aa=file.name.toLowerCase().split('.');

		if(aa[aa.length-1]=='xls'||aa[aa.length-1]=='xlsx'||aa[aa.length-1]=='doc'||aa[aa.length-1]=='docx')//判断文件格式
		{
			return 'ok';

		}
		else
		{
			return 'filewrong';
		}

	}
}

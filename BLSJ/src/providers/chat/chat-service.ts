import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Events } from 'ionic-angular';

import 'rxjs/add/operator/toPromise';

export class ChatMessage {
    messageId:string;
    userId: string;
    userName: string;
    userImgUrl: string;
    toUserId: string;
    time: number|string;
    message: string;
    status: string;
}

export class UserInfo {
    userId: string;
    userName: string;
    userImgUrl: string;
}

@Injectable()
export class ChatService {

  constructor(public http: Http,public events: Events) {
  }

  mockNewMsg(msg){
      setTimeout(() => {
          this.events.publish('chat:received', {
              messageId: Date.now().toString(),
              userId:'210000198410281948',
              userName:'Hancock',
              userImgUrl:'./assets/icon/7aec54e736d12f2ef6ada90f4ec2d56285356830.jpg',
              toUserId:'140000198202211138',
              time:Date.now(),
              message:msg.message,
              status:'success'
          }, Date.now());
      },Math.random()*1800)
  }

  getMsgList(): Promise<ChatMessage[]> {
      const msgListUrl = './assets/mock/msg-list.json';

      return this.http.get(msgListUrl)
          .toPromise()
          .then(response => response.json().array as ChatMessage[])
          .catch(err => Promise.reject(err || 'err'));
  }

  sendMsg(msg:ChatMessage){
      return new Promise( (resolve,reject) => {
          setTimeout( () =>{
              resolve(msg)
          },Math.random()*1000)
      }).then(() => {
          this.mockNewMsg(msg)
      })
  }

  getUserInfo(): Promise<UserInfo> {
      let userInfo:UserInfo = {
          userId:'140000198202211138',
          userName:'Luff',
          userImgUrl:'./assets/icon/2017-05-13 212002.jpg'
      };
      return new Promise((resolve,reject) => {
          resolve(userInfo)
      })
  }

}

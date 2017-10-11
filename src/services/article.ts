import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { Subject } from "rxjs/Rx";
export const AppOnChangeSunject1 = {
  AddressListOnChange:new Subject<any>(),//评论更新
  updatauser: new Subject<any>()
}

@Injectable()
export class ArticleService {
  constructor(
    private http: Http,
    private storage: Storage,
  ) {

  }
  token = "";
  userToken = '';
  // private url = 'http://172.16.0.205:20503/api/';
  private url = 'http://loupai.6655.la:20503/api/';

  encoded(obj){
    let str = [];
    for(let p in obj){
      if(Array.isArray(obj[p])){
        const arr = obj[p]
        if(arr.length===0){
          str.push(encodeURIComponent(p) + "=" +"");
        }
         for(let i=0;i<arr.length;i++){
           str.push(encodeURIComponent(p) + "=" +arr[i]);
         }
      }
      else
        str.push(encodeURIComponent(p) + "=" +obj[p]);
    }
    return str.join("&");
  }


  creation(Parms){
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    console.log(this.encoded(Parms))
    return this.http.post(this.url + 'article',this.encoded(Parms), { headers: headers })
  }

  imgsubmit(Parms,id,token){
    let headers = new Headers();
    // let token = this.getToken();
    headers.set('Authorization',token)
    // headers.set('Content-Type', 'application/x-www-form-urlencoded');
    console.log(this.userToken);
    let options = new RequestOptions({ headers: headers });
    // return this.http.post(this.url + 'article/g/'+id ,Parms, { headers: headers })
    return this.http.post(this.url + '/article/g/'+id ,Parms, options).map((res:Response)=>{
      return res.json();
    })
  }
  publishArticle(Parms,id,token){
    let headers = new Headers();
    headers.set('Authorization',token);
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url + 'article/sub/'+id ,this.encoded(Parms), options).map((res:Response)=>{
      return res.json();
    })
  }

  encode(params) {
    var str = '';
    if (params) {
      for (var key in params) {
        if (params.hasOwnProperty(key)) {
          var value = params[key];
          str += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
        }
      }
      str = str.substring(0, str.length - 1);
    }
    return str;
  }
  groupshoppingBuy(parms,token){
    let headers = new Headers();
    headers.set('Authorization',token);
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    console.log(this.encoded(parms));
    return this.http.post(this.url + "teamBuyVideo" ,this.encode(parms), options).map((res:Response)=>{
      return res.json();
    })

  }
  getGroupShoppingList(parms,token){
    let headers = new Headers();
    headers.set('Authorization',token);
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    console.log(this.encoded(parms));
    return this.http.get(this.url + "teamBuyVideos?" +this.encode(parms), options).map((res:Response)=>{
      return res.json();
    })
  }

  groupchange(parms: any, token: any, teamid: any,userid:any){
    let headers = new Headers();
    headers.set('Authorization',token);
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    console.log(this.encoded(parms));
    return this.http.put(this.url + `teamBuyVideo/lrc/${teamid}?userId=${userid}` ,this.encode(parms), options).map((res:Response)=>{
      return res.json();
    })
  }
  getTeamcommentList(params,token){
    let headers = new Headers();
    headers.set('Authorization',token);
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.url + "teamBuyVideo/comment/list?" +this.encode(params), options).map((res:Response)=>{
      return res.json();
    })
  }
  /*获得团购详情*/
  getdetails(params,token){
    let headers = new Headers();
    headers.set('Authorization',token);
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.url + "teamBuyVideo/" +params, options).map((res:Response)=>{
      return res.json();
    })
  }
  creationComment(params,token){
    let headers = new Headers();
    headers.set('Authorization',token);
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    console.log(this.encoded(params));
    return this.http.post(this.url + "teamBuyVideo/comment" ,this.encode(params), options).map((res:Response)=>{
      return res.json();
    })
  }
  getlike(params,token){
    let headers = new Headers();
    headers.set('Authorization',token);
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    console.log(this.encoded(params));
    return this.http.put(this.url + `teamBuyVideo/comment` ,this.encode(params), options).map((res:Response)=>{
      return res.json();
    })
  }
  videoSub(params,token){
    let headers = new Headers();
    headers.set('Authorization',token);
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    console.log(this.encoded(params));
    return this.http.put(this.url + `teamBuyVideo/sub` ,this.encode(params), options).map((res:Response)=>{
      return res.json();
    })
  }
  /*app搜索功能接口*/
  search(params,token){
    let headers = new Headers();
    headers.set('Authorization',token);
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    console.log(this.encoded(params));
    return this.http.get(this.url + `search?`+this.encode(params), options).map((res:Response)=>{
      return res.json();
    })
  }
  /*获取用户消息*/
  getmyMessage(params,token){
    let headers = new Headers();
    headers.set('Authorization',token);
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    console.log(this.encoded(params));
    return this.http.get(this.url + `message/user?`+this.encode(params), options).map((res:Response)=>{
      return res.json();
    })
  }
  /*修改用户信息*/
  setuserinfo(params,id,token){
    let headers = new Headers();
    headers.set('Authorization',token);
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.url + `user/`+id ,params, options).map((res:Response)=>{
      return res.json();
    })
  }
  /*获取用户信息*/
  getuserinfo(id,token){
    let headers = new Headers();
    headers.set('Authorization',token);
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.url + `user/`+id, options).map((res:Response)=>{
      return res.json();
    })
  }
  /*获得我参与的评论信息*/
  getTakecommment(params,token){
    let headers = new Headers();
    headers.set('Authorization',token);
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.url + `likeOrComment/user?`+this.encode(params), options).map((res:Response)=>{
      return res.json();
    })
  }
}

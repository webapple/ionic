import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class LoginService {
  constructor(private http: Http) {}

  private url = 'http://loupai.6655.la:20503/api/';
  // login(userToken:string): Promise<any>{
  //   let headers = new Headers({ 'Content-Type': 'application/json' ,"Authorization": userToken});
  //   let options = new RequestOptions({ headers: headers });
  //   console.log(options)
  //   return this.http.get(this.url,options)
  //     .toPromise()
  //     .then(res=>res)
  //     .catch(res=>res);
  // }

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

  login(userParms){
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.url + '/user/login', this.encoded(userParms), { headers: headers })
  }

  getPin(parms) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.url + '/user/captcha', this.encoded(parms), { headers: headers })
  }
}

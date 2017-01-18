import {Injectable, Inject} from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';

export class LoginUser {
  constructor(public email: string, public password: string) {}
}

@Injectable()
export class LoginService {
  isLoggedIn: boolean = false;
  constructor() {
    //this.http = http;
  }

  login(user, http) {
    console.log('Service login '+user.email);
    let hash = btoa(user.email+":"+user.password);
    console.log(hash);
    let headers = new Headers({'Accept': 'application/json'});
    headers.append("Authorization", "Basic "+hash);
    let options = new RequestOptions({ headers: headers , withCredentials: true});
    console.log(headers);
    http.post('http://localhost:8080/campaign/api/login','', options)
           .map((res : Response) => { if(res) { 
               console.log(res);
               console.log(res.json().data);
           } })
           .catch((error:any)=>{
               if (error.status === 401) {
                   console.log("Unauthorised");
               }
           })
           .subscribe();
    this.isLoggedIn = true;
    console.log(http);
  }
}
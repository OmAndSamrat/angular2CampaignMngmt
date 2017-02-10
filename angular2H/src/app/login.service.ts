import {Injectable, Inject} from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

export class LoginUser {
  constructor(public email: string, public password: string) {}
}

@Injectable()
export class LoginService {
  isLoggedIn: boolean = false;
    //public url = "http://localhost:8080/";
    //public url = "http://172.16.3.118:8080/";
    public url = window.location.origin+"/";
  constructor() {
    //this.http = http;
  }

  private getRequestOption(user) {
      let hash = btoa(user.email+":"+user.password);
      let headers = new Headers({'Accept': 'application/json'});
      headers.append("Authorization", "Basic "+hash);
      console.log(headers);
      let options = new RequestOptions({ headers: headers , withCredentials: true});
      return options;
  }
  getRequestOptionLocale() {
      let headers = new Headers({'Accept': 'application/json'});
      let authKey = localStorage.getItem('authKey');
      headers.append("authKey", authKey);
      let options = new RequestOptions({ headers: headers , withCredentials: true});
      console.log(headers);
      return options;
  }
  
  private extractData(res: Response) {
      console.log(res);
      console.log('Responce Got ');
      //let body = res.json();
      //console.log(body);
      return res || { };
  }
  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      //const body = error.json() || '';
      //const err = body.error || JSON.stringify(body);
      //errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        errMsg = `${error.status} - ${error.statusText || ''}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
  
  logout(http) : Observable<Response> {
      return http.post(this.url+'campaign/api/logout', '', this.getRequestOptionLocale())
      .map(this.extractData)
      .catch(this.handleError);
  }
  
  login(user, http) : Observable<Response> {
    console.log('Service login '+user.email+' and Url is '+this.url);
    return http.post(this.url+'campaign/api/login', '', this.getRequestOption(user))
    .map(this.extractData)
    .catch(this.handleError);
    /*http.post(this.url+'campaign/api/login','', this.getRequestOption(user))
           .subscribe((res)=> {
                var payload = res.json();
                console.log("PayLoad "+res);
                console.log("PayLoad = "+payload)
                var headers = res.headers;
                console.log("Header = "+headers)
                console.log("Authentication Key "+headers.get("authkey"));
            },
            (error) => {
                console.log(error);
                if (error.status === 401) {
                    console.log("Unauthorised");
                }
            });*/
      }
}
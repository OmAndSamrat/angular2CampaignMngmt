import {Http} from '@angular/http';
import { LoginService, LoginUser } from './login.service';
import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
//import {LoginService, LoginUser} from './login.service';


@Component ({
  selector: 'app-login', 
  providers: [LoginService],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  public user = new LoginUser('', '');
  public errorMsg = '';
  constructor(private _loginService: LoginService, private _http: Http, private _router: Router, private route: ActivatedRoute) {
  }
   login() { 
       
       this._loginService.login(this.user, this._http)
       .subscribe(res => {
                           let user = res.json();
                           let headers = res.headers;
                           let authKey = headers.get("authkey");
                           console.log('Returned User is '+user);
                           console.log('Auth Key '+authKey);
                               if(user) {
                                   localStorage.setItem('currentUser',JSON.stringify(user));
                                   localStorage.setItem('authKey',authKey);
                                   this._router.navigate(['./home'],{ relativeTo: this.route });
                               }
                           },
       error =>  this.errorMsg = <any>error);
       
       
     console.log('Controller login');
     /*if ( !this._loginService.login(this.user, this._http)) {
         this.errorMsg = 'Failed to log in';
     } else {
         this._router.navigate(['./home']);
     }*/
   }
 }
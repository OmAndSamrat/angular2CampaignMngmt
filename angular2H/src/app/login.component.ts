import {Http} from '@angular/http';
import { LoginService, LoginUser } from './login.service';
import {Component} from '@angular/core';
import {Router} from '@angular/router';
//import {LoginService, LoginUser} from './login.service';


@Component ({
  selector: 'app-login', 
  providers: [LoginService],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  public user = new LoginUser('', '');
  public errorMsg = '';
  constructor(private _loginService: LoginService, private _http: Http, private _router: Router) {}
   login() {
     console.log('Controller login');
     this._router.navigate(['./home']);
     
     if ( !this._loginService.login(this.user, this._http)) {
       this.errorMsg = 'Failed to log in';
       
     }
   }
 }
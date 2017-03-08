import {Component} from '@angular/core';
import { LoginService, LoginUser } from '../login.service';
import {Router} from '@angular/router';
import {Http} from '@angular/http';
@Component ({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent {
  public errorMsg = '';
  public roles = [];
  public userName = "";
  public email = "";
  constructor(private _loginService: LoginService, private _http: Http, private _router: Router) {
      let user = JSON.parse(localStorage.getItem("currentUser"));
      this.roles = user.userRoles;
      this.userName = user.firstName +' '+user.lastName;
      this.email = "";
      console.log(this.roles);
  }
  hasUserRole(role:string) {
     //console.log("User Role ");  
     //console.log('Method Called '+this.roles);
     for(var i=0; i<this.roles.length; i++) {
        // console.log('Index is '+role.indexOf(this.roles[i].roleName));
         if(role.indexOf(this.roles[i].roleName) >= 0) {
             return true;
           }
     }
     return false;
  }
  logout() {
        this._loginService.logout(this._http).subscribe();
        localStorage.setItem('currentUser',null);
        localStorage.setItem('authKey',null);
        this._router.navigate(['']);
    }


}
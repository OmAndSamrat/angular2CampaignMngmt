import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log('Route Url is '+route.url);
        let user = JSON.parse(localStorage.getItem('currentUser'));
        let authKey = localStorage.getItem('authKey'); 
        console.log('Loged in User '+user);
        if (authKey !=null && authKey != '') {
            // logged in so return true
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/campaign'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login.component';
import { HomeComponent } from './home/home.component';
import { CrOrgComponent } from './admin/crorg.component';
import {HomeModule} from './home/home.module'
import {LoginService} from './login.service';
import {RouterModule, Routes} from '@angular/router';

const appRoutes:Routes = [{path:'', component : LoginComponent}, {path:'home', component : HomeComponent}, {path:'crorg', component : CrOrgComponent}];
@NgModule({
  declarations: [
    AppComponent, LoginComponent, HomeComponent, CrOrgComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }

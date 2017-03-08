import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login.component';
import {HomeModule} from './home/home.module'
import {CampaignModule} from './campaign/campaign.module'
import {LoginService} from './login.service';
import {RouterModule, Routes} from '@angular/router';

const appRoutes:Routes = [{path:'', component : LoginComponent},{path:'campaign', component : LoginComponent}];
@NgModule({
  declarations: [
    AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HomeModule,
    CampaignModule,
    RouterModule.forRoot(appRoutes,{useHash: true})
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }

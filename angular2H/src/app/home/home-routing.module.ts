import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }   from './home.component';
import {AuthGuard }    from './auth.guard';
import { CrOrgComponent }  from '../../app/admin/crorg.component';
import { SearchOrgComponent }  from '../../app/admin/searchorg.component';
import { CrDomainComponent }  from '../../app/admin/crdomain.component';
import { SearchDomainComponent }  from '../../app/admin/searchdomain.component';
import { CrGeoComponent }  from '../../app/admin/crgeo.component';
import { SearchGeoComponent }  from '../../app/admin/searchgeo.component';
import { CrDesignationComponent }  from '../../app/admin/crdesignation.component';
import { SearchDesignationComponent }  from '../../app/admin/searchdesignation.component';
import { CrContactComponent }  from '../../app/admin/crcontact.component';
import { SearchContactComponent }  from '../../app/admin/searchcontact.component';


//import { AuthGuard }                from '../auth-guard.service';

const homeRouts: Routes = [
  {path: 'home',  component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'crorg', component: CrOrgComponent },
  {path: 'searchorg', component: SearchOrgComponent },
  { path: 'crorg/:id', component: CrOrgComponent },
  {path: 'crdomain', component: CrDomainComponent },
  {path: 'searchdomain', component: SearchDomainComponent },
  {path: 'crgeo', component: CrGeoComponent },
  {path: 'searchgeo', component: SearchGeoComponent },
  {path: 'crdesg', component: CrDesignationComponent },
  {path: 'searchdesg', component: SearchDesignationComponent },
  {path: 'crcontact/:id', component: CrContactComponent },
  {path: 'searchcontact/:id', component: SearchContactComponent },
    {path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'crorgChild', component: CrOrgComponent },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(homeRouts)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule {}
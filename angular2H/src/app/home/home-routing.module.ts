import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }   from './home.component';
import { CrOrgComponent }  from '../../app/admin/crorg.component';


//import { AuthGuard }                from '../auth-guard.service';

const homeRouts: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'crorg', component: CrOrgComponent },
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
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }   from '../../app/home/home.component';
import { CrOrgComponent }  from '../../app/admin/crorg.component';
import { SearchCampaignContactComponent }  from '../../app/campaign/searchcampaigncomponent.component';
import { SearchCampaignResultComponent }  from '../../app/campaign/searchcampaignresult.component';
import {CrCampaignComponent} from './crcampaign.component';
import {CrEdmCampaignComponent} from './credmcampaign.component';
import {EditEdmCampaignComponent} from './editedm.component';
import {TryCampignComponent} from './trycampaign.component';
import {ExecuteCampignComponent} from './executecampaign.component';
import {ManageEdmComponent} from './manageedm.component';
import {AssignedContactComponent} from './assignedcontact.component';
import {EdmProgressComponent} from './edmprogress.component';

//import { AuthGuard }                from '../auth-guard.service';

const campaignRoutes: Routes = [
  {path: 'home',  component: HomeComponent },
  {path: 'searchCampaign/:id', component: SearchCampaignContactComponent },
  {path: 'crcampaign', component: CrCampaignComponent },
  {path: 'crcampaign/:id', component: CrCampaignComponent },
  {path: 'credmcampaign/:id', component: CrEdmCampaignComponent },
  {path: 'trycampaign/:id', component: TryCampignComponent },
  {path: 'executecampaign/:id', component: ExecuteCampignComponent },
  {path: 'manageedm/:id', component: ManageEdmComponent },
  {path: 'searchCampaignResult', component: SearchCampaignResultComponent },
  {path: 'editcampaign/:id', component: EditEdmCampaignComponent},
  {path: 'assignedContact/:id', component: AssignedContactComponent},
  {path: 'progressreport', component: EdmProgressComponent},
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
    RouterModule.forChild(campaignRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CampaignRoutingModule {}
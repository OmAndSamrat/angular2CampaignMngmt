import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { SearchCampaignContactComponent }  from './searchcampaigncomponent.component';
import { SearchCampaignResultComponent }  from './searchcampaignresult.component';
import {CrCampaignComponent} from './crcampaign.component'
import { ManageCampaignService }  from './managecampaign.service';
import {HomeModule} from '../../app/home/home.module'
import { CampaignRoutingModule } from './campaign-routing.module';
import {CrEdmCampaignComponent} from './credmcampaign.component';
import {TryCampignComponent} from './trycampaign.component';
import {ExecuteCampignComponent} from './executecampaign.component';
import {ManageEdmComponent} from './manageedm.component';
import {EditEdmCampaignComponent} from './editedm.component';
import {AssignedContactComponent} from './assignedcontact.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomeModule,
    CampaignRoutingModule
  ],
  declarations: [SearchCampaignResultComponent, SearchCampaignContactComponent, ExecuteCampignComponent,
                 TryCampignComponent, CrCampaignComponent, CrEdmCampaignComponent, ManageEdmComponent,
                 AssignedContactComponent, EditEdmCampaignComponent],
  providers: [ManageCampaignService]
})
export class CampaignModule {}

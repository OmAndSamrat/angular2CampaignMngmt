import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { HomeComponent }   from './home.component';
import {AuthGuard }    from './auth.guard';
import { MenuComponent }   from './menu.component';
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
import { OrganizationService }  from '../../app/admin/organization.service';

import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule
  ],
  exports:[MenuComponent],
  declarations: [HomeComponent, CrOrgComponent, SearchOrgComponent, 
                 MenuComponent, CrDomainComponent, SearchDomainComponent, 
                 CrGeoComponent, SearchGeoComponent, CrDesignationComponent, 
                 SearchDesignationComponent,CrContactComponent,SearchContactComponent],
  providers: [OrganizationService,AuthGuard]
})
export class HomeModule {}

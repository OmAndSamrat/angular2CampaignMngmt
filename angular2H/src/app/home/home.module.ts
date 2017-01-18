import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { HomeComponent }   from './home.component';
import { CrOrgComponent }  from '../../app/admin/crorg.component';

import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule
  ],
  declarations: [HomeComponent, CrOrgComponent],
  providers: []
})
export class HomeModule {}

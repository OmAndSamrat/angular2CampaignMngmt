import {Component, OnInit} from "@angular/core";
import {OrganizationService} from './organization.service'
import {Organization, Domain, Geography, GeographyRes} from '../../app/common/jsonobj.component'
@Component ({
    selector: 'app-searchgeo',
    templateUrl: './searchgeo.component.html'
  })
  export class SearchGeoComponent implements OnInit {
    public errorMsg = '';
    geos: GeographyRes[];
    constructor(private service: OrganizationService) {}
    ngOnInit() {
        console.log("Initiallize search component");
        this.getGeos();
    }
    getGeos() {
        this.service.getGeographysRes()
        .subscribe(
          geographiess => this.geos = geographiess,
          error =>  this.errorMsg = <any>error);
    }
    
    
    
 }


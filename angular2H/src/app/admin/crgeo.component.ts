import {Component, OnInit} from "@angular/core";
import {Router} from '@angular/router';
import {OrganizationService} from './organization.service'
import {Organization, Domain, Geography, GeographyRes} from '../../app/common/jsonobj.component'

@Component ({
    selector: 'app-domain',
    templateUrl: './crgeo.component.html'
  })
  export class CrGeoComponent implements OnInit {
    public errorMsg = '';
    public geo = new GeographyRes(null,'');
    constructor(private service: OrganizationService, private _router: Router) {}
    ngOnInit() {
        console.log("Initiallize component"+this.geo)
    }
    createGeo() {
        console.log(this.geo);
        this.service.createGeo(this.geo)
                .subscribe(geography => {
                                    this.geo = geography;
                                    console.log('Service Called Subs start');
                                    this._router.navigate(['/searchgeo']);
                                    console.log('Service Called subs end');
                                    
                                    },
                error =>  this.errorMsg = <any>error);
        console.log('Create Geo finished');
    }
    
 }
import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute, Params} from '@angular/router';
import {OrganizationService} from './organization.service'
import {Organization, Domain, Geography, GeographyRes} from '../../app/common/jsonobj.component'
@Component ({
    selector: 'app-crorg',
    templateUrl: './crorg.component.html'
  })
  export class CrOrgComponent implements OnInit {
    public errorMsg = '';
    //public geographies = [];
    public domains : Domain[];
    public organization = new Organization(new Domain(0,'',''), new GeographyRes(0,''),'','','','');
    geographies: GeographyRes[];
    constructor(private service: OrganizationService, private _router: Router, private route: ActivatedRoute) {
        this.getGeos();
        this.getDomains();
        //First check that params Id is there or not. If there then populate Organization. 
        this.route.params.subscribe((params : Params) => {
                                            let orgId = +params['id'];
                                            console.log('Params is '+orgId);
                                            if(!isNaN(orgId)) {
                                                this.service.getOrg(+params['id']).subscribe((org: Organization) => this.organization = org);
                                            }
                                            
                                     });
        
        /*this.route.params.switchMap((params: Params) => this.service.getOrg(+params['id']))
            .subscribe((org: Organization) => this.organization = org);*/
    }
    ngOnInit() {
        console.log("CrOrgComponent Initialised")
    }
    getGeos() {
        this.service.getGeographysRes()
                         .subscribe(
                           heroes => this.geographies = heroes,
                           error =>  this.errorMsg = <any>error);
      }
    getDomains() {
        this.service.getDomains()
        .subscribe(
          domains => this.domains = domains,
          error =>  this.errorMsg = <any>error);
    }
    
    createOrg() {
        console.log(this.organization)
        this.service.createOrganizations(this.organization)
                .subscribe(org => {
                                    this.organization = org;
                                    console.log('Service Called Subs start');
                                    this._router.navigate(['/searchorg']);
                                    console.log('Service Called subs end');
                                    
                                    },
                error =>  this.errorMsg = <any>error);
        console.log('Create Org finished');
    }
    
 }

 /* export class CrOrgComponent implements OnInit {
    public geographies = []; 
    public domains = [];
    public errorMsg = '';
    public organization = new Organization(new Domain(0,''), new Geography(0,''),'','','');
    constructor(private service: OrganizationService) {
       
    }
    ngOnInit() {
        this.geographies = this.service.getGeographies();
        this.domains = this.service.getDomains();
        console.log(this.geographies)
    }
  }*/
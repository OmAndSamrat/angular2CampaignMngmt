import {Component, OnInit} from "@angular/core";
import {OrganizationService} from './organization.service'
import {Organization, Domain, Geography, GeographyRes} from '../../app/common/jsonobj.component'
import {Router} from '@angular/router';
@Component ({
    selector: 'app-searorg',
    templateUrl: './searchorg.component.html'
  })
  export class SearchOrgComponent implements OnInit {
    public errorMsg = '';
    public organization = new Organization(new Domain(0,'',''), new GeographyRes(0,''),'','','','');
    organizations: Organization[];
    constructor(private service: OrganizationService, private _router:Router) {
        this.getOrgs();
    }
    ngOnInit() {
        console.log("Initiallize search component"+this.organizations);
        
    }
    getOrgs() {
        this.service.getOrgs()
                         .subscribe(
                           orgs => this.organizations = orgs,
                           error =>  this.errorMsg = <any>error);
    }
    
    editOrg(orgId) {
        console.log('Edit org Id '+orgId);
        this._router.navigate(['/crorg',orgId]);
    }
    searchContact(orgId) {
        console.log('Search for Organization id '+orgId);
        this._router.navigate(['/searchcontact',orgId]);
    }
   /* getGeos() {
        this.service.getHeroes()
                         .subscribe(
                           heroes => this.geographies = heroes,
                           error =>  this.errorMsg = <any>error);
      }
    getDomains() {
        this.service.getDomains()
        .subscribe(
          domains => this.domains = domains,
          error =>  this.errorMsg = <any>error);
    }*/
    
    /*createOrg() {
        console.log(this.organization)
        this.service.createOrganizations(this.organization)
                .subscribe(org => this.organization = org,
                error =>  this.errorMsg = <any>error);;
    }*/
    
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
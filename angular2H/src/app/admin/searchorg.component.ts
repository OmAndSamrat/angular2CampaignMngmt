import {Component, OnInit} from "@angular/core";
import {OrganizationService} from './organization.service'
import {Organization, Domain, Geography, GeographyRes, SearchOrganization} from '../../app/common/jsonobj.component'
import {Router} from '@angular/router';
@Component ({
    selector: 'app-searorg',
    templateUrl: './searchorg.component.html'
  })
  export class SearchOrgComponent implements OnInit {
    public errorMsg = '';
    public organization = new Organization(new Domain(0,'',''), new GeographyRes(0,''),'','','','');
    public searchOrganization = new SearchOrganization("",0,0);
    organizations: Organization[];
    public domains : Domain[];
    geographies: GeographyRes[];
    constructor(private service: OrganizationService, private _router:Router) {
        this.getOrgs();
    }
    ngOnInit() {
        console.log("Initiallize search component"+this.organizations);
        this.getGeos();
        this.getDomains();
        
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
    getOrgs() {
        this.service.getOrgs()
                         .subscribe(
                           orgs => this.organizations = orgs,
                           error =>  this.errorMsg = <any>error);
    }
    
    searchOrg() {
        console.log(this.searchOrganization.orginazationName +', and '+this.searchOrganization.domainId+', and '+this.searchOrganization.geographyId);
        this.service.searchOrg(this.searchOrganization)
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
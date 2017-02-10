import {Component, OnInit} from "@angular/core";
import {OrganizationService} from './organization.service'
import {Organization, Domain, Geography, GeographyRes, Contact, Designation, DesignationGroup} from '../../app/common/jsonobj.component'
import {Router, ActivatedRoute, Params} from '@angular/router';
@Component ({
    selector: 'app-searchcontact',
    templateUrl: './searchcontact.component.html'
  })
  export class SearchContactComponent implements OnInit {
    public errorMsg = '';
    public selectedOrgId;
    public organization = new Organization(new Domain(0,'',''), new GeographyRes(0,''),'','','','');
    public contact = new Contact(null, "", "", "", "", "", new Designation(0,'', new DesignationGroup(null, "")), this.organization,'','');
    contacts: Contact[];
    constructor(private service: OrganizationService, private _router: Router, private route: ActivatedRoute) {
        this.route.params
        .switchMap((params: Params) => this.service.getOrgContacts(+params['id']))
        .subscribe((contactList: Contact[]) => {
                this.contacts = contactList; 
                if(contactList.length!=0) {
                    this.organization = this.contacts[0].organization
                } else {
                    this.route.params
                    .switchMap((params: Params) => this.service.getOrg(+params['id']))
                    .subscribe((org: Organization) => this.organization = org);
                }
                
            });
        //this.getOrgContacts();
    }
    ngOnInit() {
        console.log("Initiallize search component"+this.contacts);
        
    }/*
    getOrgContacts() {
        this.service.getOrgContacts(this.selectedOrgId)
                         .subscribe(
                           contactList => this.contacts = contactList,
                           error =>  this.errorMsg = <any>error);
    }*/
    createContact(orgId) {
        console.log('Create Contact org Id '+orgId);
        this._router.navigate(['/crcontact',orgId]);
    }
    
}
import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute, Params} from '@angular/router';
import {OrganizationService} from './organization.service'
import {Organization, Designation, DesignationGroup, Contact, Gender, Domain, GeographyRes} from '../../app/common/jsonobj.component'
@Component ({
    selector: 'app-crcontact',
    templateUrl: './crcontact.component.html'
  })
  export class CrContactComponent implements OnInit {
    public errorMsg = '';
    //public geographies = [];
    public designations : Designation[];
    genders: Gender[];
    public organization = new Organization(new Domain(0,'',''), new GeographyRes(0,''),'','','','');
    public contact = new Contact(null, "", "", "", "", "", new Designation(0,'', new DesignationGroup(null, "")), this.organization,'','');
    constructor(private service: OrganizationService, private _router: Router, private route: ActivatedRoute) {
        this.getGenders();
        this.getDesignations();
        this.route.params
        .switchMap((params: Params) => this.service.getOrg(+params['id']))
        .subscribe((org: Organization) => this.contact.organization = org);
        
    }
    ngOnInit() {
         //this.getGenders();
        //this.geographies = this.service.getGeographies();
        //this.domains = this.service.getDomains();
         
         console.log("Selected Organization "+this.contact.organization);
    }
    getGenders() {
        this.genders = [
                      new Gender('M', 'Male'),
                      new Gender('F', 'Female'),
                    ];
      }
    getDesignations() {
        this.service.getDesignations()
        .subscribe(
          desgns => this.designations = desgns,
          error =>  this.errorMsg = <any>error);
    }
    
    createContact() {
        console.log(this.contact)
        this.contact.contactName = this.contact.firstName+' '+this.contact.surName;
        this.service.createContact(this.contact)
                .subscribe(contactR => {
                                    this.contact = contactR;
                                    console.log('Service Called Subs start');
                                    this._router.navigate(['/searchcontact',this.contact.organization.organisationID]);
                                    console.log('Service Called subs end');
                                    
                                    },
                error =>  this.errorMsg = <any>error);
        console.log('Create Org finished');
    }
    
 }

 
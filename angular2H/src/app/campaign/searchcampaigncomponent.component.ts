import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute, Params} from '@angular/router';
import {OrganizationService} from '../../app/admin/organization.service'
import {ManageCampaignService} from './managecampaign.service'
import {MenuComponent} from '../../app/home/menu.component'
import {Organization, Designation, DesignationGroup, Contact, Gender, Domain, GeographyRes,
    Campaign, SearchQuery, SelectableCommuication, Communication, Status} from '../../app/common/jsonobj.component'
@Component ({
    selector: 'app-searchcampaign',
    templateUrl: './searchcampaigncontact.component.html'
  })
export class SearchCampaignContactComponent implements OnInit {
    public errorMsg = '';
    
    public designations : Designation[];
    public genders: Gender[];
    public domains : Domain[];
    public geographies: GeographyRes[];
    public designationGroups: DesignationGroup[];
    public organizations:Organization[];
    public contactResults:Contact[];
    public communications : Communication[];
    
    public selectableCommunications : SelectableCommuication[] = [];
    
    public searchQuery = new SearchQuery("","","","","","","","","","","");
    public organization = new Organization(new Domain(0,'',''), new GeographyRes(0,''),'','','','');
    public contact = new Contact(null, "", "", "", "", "", new Designation(0,'', new DesignationGroup(null, "")), this.organization,'','');
    public selectedCampaign  = new Campaign(1, new Status(null,""),"","","", "");
    constructor(private manageService: ManageCampaignService, private service: OrganizationService, private _router: Router, private route: ActivatedRoute) {
        this.getGenders();
        this.getDesignations();
        this.getDesgnGroups();
        this.getOrgs();
        this.getDomains();
        this.getGeos();
        this.route.params
        .switchMap((params: Params) => this.manageService.getCampaign(+params['id']))
        .subscribe((campaign: Campaign) => this.selectedCampaign = campaign);
        
    }
    ngOnInit() {
         //this.getGenders();
        //this.geographies = this.service.getGeographies();
        //this.domains = this.service.getDomains();
         
         console.log("Selected Organization "+this.contact.organization);
    }
    getOrgs() {
        this.service.getOrgs()
                         .subscribe(
                           orgs => this.organizations = orgs,
                           error =>  this.errorMsg = <any>error);
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
    getDesgnGroups() {
        this.service.getDesignationGroups()
                         .subscribe(
                           desgGroups => this.designationGroups = desgGroups,
                           error =>  this.errorMsg = <any>error);
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
    
    searchContact() {
        console.log(this.searchQuery)
        this.manageService.searchContacts(this.searchQuery, this.selectedCampaign.campaignID)
                         .subscribe(
                           result => {this.buildCommunicationArray(result);
                                       console.log('subscribe '+this.selectableCommunications)},
                           error =>  this.errorMsg = <any>error);
    }
    
    buildCommunicationArray(contactResults : Contact[]) {
        console.log('Selectable Arry Length is  '+contactResults.length);
        for(var i=0; i< contactResults.length; i++) {
            var contact = contactResults[i];
            var communication = new Communication(null, contact, this.selectedCampaign);
            var selectableCommunication = new SelectableCommuication(communication, false);
            this.selectableCommunications.push(selectableCommunication);
        }
        console.log('Selectable Arry is ');
        console.log(this.selectableCommunications);
    }
    
    addContact() {
        console.log(this.selectableCommunications);
        var filteresCommunications = this.selectableCommunications
                                          .filter(selectableCommunication => selectableCommunication.isAssignedToCampaign)
                                          .map(selectableCommunication => selectableCommunication.communication);
        console.log(filteresCommunications);
        this.manageService.createBulkCommunicationInCampaign(this.selectedCampaign.campaignID, filteresCommunications)
                         .subscribe(result => {
                                                 this.communications = result;
                                                 this._router.navigate(['/searchCampaignResult']);
                                              },
                           error =>  this.errorMsg = <any>error);
    }
    
    /*searchContact()() {
        console.log(this.searchQuery)
        this.manageService.searchContacts(this.searchQuery)
                .subscribe(
                           contacts => this.contactResults = contacts,
                           error =>  this.errorMsg = <any>error);
        console.log('this.contactResults');
    }*/
    
 }

 
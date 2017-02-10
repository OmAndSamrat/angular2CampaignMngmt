import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute, Params} from '@angular/router';
import {OrganizationService} from '../../app/admin/organization.service'
import {ManageCampaignService} from './managecampaign.service'
import {MenuComponent} from '../../app/home/menu.component'
import {Campaign, SearchCampaign} from '../../app/common/jsonobj.component'
@Component ({
    selector: 'app-searchcampaignresult',
    templateUrl: './searchcampaignresult.component.html'
  })
export class SearchCampaignResultComponent implements OnInit {
    public errorMsg = '';
    
    
    public campaignResults:Campaign[];
    public searchQuery = new SearchCampaign("","","","","");
    constructor(private manageService: ManageCampaignService, private service: OrganizationService, private _router: Router, private route: ActivatedRoute) {
    }
    ngOnInit() {
         //this.getGenders();
        //this.geographies = this.service.getGeographies();
        //this.domains = this.service.getDomains();
         
         console.log("Selected Organization "+this.searchQuery);
    }
    manageCommunication(campaignId) {
        this._router.navigate(['/assignedContact',campaignId]);
    }
    manageEDM(campaignId) {
        this._router.navigate(['/manageedm',campaignId]);
    }
    searchCampaign() {
        console.log(this.searchQuery)
        this.manageService.searchCampaigns(this.searchQuery)
                         .subscribe(
                           result => this.campaignResults = result,
                           error =>  this.errorMsg = <any>error);
    }
    editCampaign(campaignId) {
        console.log('Edit campaign Id '+campaignId);
        this._router.navigate(['/crcampaign',campaignId]);
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

 
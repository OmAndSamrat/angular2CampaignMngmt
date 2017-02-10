import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ManageCampaignService} from './managecampaign.service'
import {Campaign, Status, Edm} from '../../app/common/jsonobj.component'
@Component ({
    selector: 'app-manageedm',
    templateUrl: './manageedm.component.html'
  })
  export class ManageEdmComponent implements OnInit {
    public errorMsg = '';
    public campaign = new Campaign(null, new Status(null, ""), "", "", "", "");
    public edms : Edm[] = [];
    constructor(private service: ManageCampaignService, private _router: Router, private route: ActivatedRoute) {
        this.route.params
        .switchMap((params: Params) => this.service.getCampaign(+params['id']))
        .subscribe((campaign: Campaign) => this.campaign = campaign);
    }
    ngOnInit() {
         this.getEdms();
        //this.geographies = this.service.getGeographies();
        //this.domains = this.service.getDomains();
         console.log(this.campaign);
    }
    
    createEDM(campaignId) {
        this._router.navigate(['/credmcampaign',campaignId]);
    }
    
    editEDM(edmId) {
        this._router.navigate(['/editcampaign', edmId]);
    }
    //TODO open try campaign page. method of try Campaign
    tryCampaign(edmid) {
        this._router.navigate(['/trycampaign',edmid]);
    }
    //TODO open Execute campaign page. method Execute Campaign
    executeCampaign(edmid) {
        this._router.navigate(['/executecampaign',edmid]);
    }
    
    getEdms() {
        this.service.getEdms()
                         .subscribe(
                           edms => {
                                   this.edms = edms.filter(edm => edm.campaign.campaignID == this.campaign.campaignID);
                               },
                           error =>  this.errorMsg = <any>error);
    }
 }

 
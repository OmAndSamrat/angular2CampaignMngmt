import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ManageCampaignService} from './managecampaign.service'
import {Campaign, Status} from '../../app/common/jsonobj.component'
@Component ({
    selector: 'app-crcampaign',
    templateUrl: './crcampaign.component.html'
  })
  export class CrCampaignComponent implements OnInit {
    public errorMsg = '';
    public campaign = new Campaign(null, new Status(null, ""), "", "", "", "");
    constructor(private service: ManageCampaignService, private _router: Router, private route: ActivatedRoute) {
        this.route.params
        .switchMap((params: Params) => this.service.getCampaign(+params['id']))
        .subscribe((campaign: Campaign) => this.campaign = campaign);
    }
    ngOnInit() {
         //this.getGenders();
        //this.geographies = this.service.getGeographies();
        //this.domains = this.service.getDomains();
         console.log(this.campaign);
    }
    
    createCampaign() {
        console.log("Selected Campaign "+this.campaign.campaignStartDate)
        console.log("Selected Campaign "+this.campaign.campaignEndDate)
        this.service.createCampaign(this.campaign)
                .subscribe(campR => {
                                        this.campaign = campR;
                                        this.errorMsg = this.campaign.campaignName +'created successfully.'
                                    },
                error =>  this.errorMsg = <any>error);
        console.log('Create Campaign finished');
    }
    
    createCampaignandNext() {
        console.log(this.campaign)
        this.service.createCampaign(this.campaign)
                .subscribe(campR => {
                                    this.campaign = campR;
                                    console.log('Service Called Subs start');
                                    this._router.navigate(['/searchCampaign',this.campaign.campaignID]);
                                    console.log('Service Called Subs end');
                                    },
                error =>  this.errorMsg = <any>error);
        console.log('Create Campaign and Next finished');
    }
    
 }

 
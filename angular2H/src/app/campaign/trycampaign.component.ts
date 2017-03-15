import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ManageCampaignService} from './managecampaign.service'
import {Campaign, Status, Edm} from '../../app/common/jsonobj.component'
@Component ({
    selector: 'app-crcampaign',
    templateUrl: './trycampaign.component.html'
  })
  export class TryCampignComponent implements OnInit {
    public errorMsg = '';
    public edmId;
    public campaign = new Campaign(null, new Status(null, ""), "", "", "", "");
    public edm = new Edm(null, this.campaign,"",new Status(null, ""),"","");
    constructor(private service: ManageCampaignService, private _router: Router, private route: ActivatedRoute) {
        this.route.params
        .switchMap((params: Params) => this.service.getEdm(+params['id']))
        .subscribe((edm: Edm) => this.edm = edm);
        
        //this.route.params.subscribe((params:Params)=> this.edmId = +params['edmid']);
    }
    ngOnInit() {
         console.log(this.campaign);
    }
    
    tryCampaign() {
        console.log("Selected Campaign "+this.campaign.campaignStartDate)
        console.log("Selected Campaign "+this.campaign.campaignEndDate)
        this.service.tryCampaign(this.edm.campaign.campaignID, this.edm.edmId)
                .subscribe(campR => {
                                    console.log('Service Called Subs start');
                                    this.errorMsg = 'Execution is in progress. To check progress Click Progrss tab.';
                                    console.log('Service Called subs end');
                                    },
                error =>  this.errorMsg = <any>error);
        console.log('Create Campaign finished');
    }
}

 
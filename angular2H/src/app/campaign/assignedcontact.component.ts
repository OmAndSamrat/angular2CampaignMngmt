import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ManageCampaignService} from './managecampaign.service'
import {Campaign, Status, Contact, Communication} from '../../app/common/jsonobj.component'
@Component ({
    selector: 'app-assignedcontact',
    templateUrl: './assignedcontact.component.html'
  })
  export class AssignedContactComponent implements OnInit {
    public errorMsg = '';
    public campaign = new Campaign(null, new Status(null, ""), "", "", "", "");
    public communications : Communication[] = [];
    constructor(private service: ManageCampaignService, private _router: Router, private route: ActivatedRoute) {
        this.route.params
        .switchMap((params: Params) => this.service.getCampaign(+params['id']))
        .subscribe((campaign: Campaign) => {this.campaign = campaign; this.getCampaignContacts();});
    }
    ngOnInit() {
    }
    deleteContactFromCampaign(communicationId) {
        //this._router.navigate(['/editcampaign', edmId]);
        this.service.deleteCampaignCommunication(this.campaign.campaignID,communicationId)
        .subscribe(
          comms => {
                  this.errorMsg = 'Communication Deleted.';
                  this.getCampaignContacts();
              },
          error =>  this.errorMsg = <any>error);
    }
    getCampaignContacts() {
        console.log('In Get Contact '+this.campaign.campaignID);
        this.service.getCampaignContacts(this.campaign.campaignID)
                         .subscribe(
                           comms => {
                                   this.communications = comms;
                               },
                           error =>  this.errorMsg = <any>error);
    }
 }

 
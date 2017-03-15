import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ManageCampaignService} from './managecampaign.service'
import {Campaign, Status, Edm} from '../../app/common/jsonobj.component'
@Component ({
    selector: 'app-crcampaign',
    templateUrl: './credmcampaign.component.html'
  })
  export class CrEdmCampaignComponent implements OnInit {
    public errorMsg = '';
    public file;
    public campaign = new Campaign(null, new Status(null, ""), "", "", "", "");
    public edm = new Edm(null, this.campaign, "",new Status(null, ""),"","");
    constructor(private service: ManageCampaignService, private _router: Router, private route: ActivatedRoute) {
        this.route.params
        .switchMap((params: Params) => this.service.getCampaign(+params['id']))
        .subscribe((campaign: Campaign) => this.edm.campaign = campaign);
        
        //this.edmid = this.route.queryParams['edm'];
        //console.log('Edm id is query Param '+this.edmid);
    }
    ngOnInit() {
         console.log(this.campaign);
    }
    
    selectFile($event): void {
        var inputValue = $event.target;
        this.file = inputValue.files[0];
        console.debug("Input File name: " + this.file.name + " type:" + this.file.size + " size:" + this.file.size);
    }
    
    uploadEdmfile() {
        this.service.createEdmFile(this.edm.campaign.campaignID, this.file, this.edm.subject).subscribe(
                edmid => {
                        console.log('success');
                        this._router.navigate(['/trycampaign',edmid]);
                        },
                error => this.errorMsg = <any>error
            );
    }
    
    createEdm() {
        console.log("Selected Campaign "+this.campaign.campaignStartDate)
        console.log("Selected Campaign "+this.campaign.campaignEndDate)
        this.service.createEdm(this.edm)
                .subscribe(edmR => {
                                    this.edm = edmR;
                                    console.log('Service Called Subs start');
                                    //TODO - Forward it to Upload HTML page.
                                    //this._router.navigate(['/searchcontact',this.contact.organization.organisationID]);
                                    console.log('Service Called Subs end');
                                    },
                error =>  this.errorMsg = <any>error);
        console.log('Create Campaign finished');
    }
 }

 
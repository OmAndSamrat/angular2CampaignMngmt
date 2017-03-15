import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ManageCampaignService} from './managecampaign.service'
import {Campaign, Status, Edm} from '../../app/common/jsonobj.component'
@Component ({
    selector: 'app-edcampaign',
    templateUrl: './editedm.component.html'
  })
  export class EditEdmCampaignComponent implements OnInit {
    public errorMsg = '';
    public file;
    public campaign = new Campaign(null, new Status(null, ""), "", "", "", "");
    public edm = new Edm(null, this.campaign, "",new Status(null, ""),"","");
    constructor(private service: ManageCampaignService, private _router: Router, private route: ActivatedRoute) {
        this.route.params
        .switchMap((params: Params) => this.service.getEdm(+params['id']))
        .subscribe((edm: Edm) => this.edm = edm);
    }
    ngOnInit() {
         console.log(this.edm);
    }
    
    selectFile($event): void {
        var inputValue = $event.target;
        this.file = inputValue.files[0];
        console.debug("Input File name: " + this.file.name + " type:" + this.file.size + " size:" + this.file.size);
    }
    
    uploadEdmfile() {
        this.service.updateEdmFile(this.edm.edmId,this.file, this.edm.subject).subscribe(
                edmid => {
                        console.log('success');
                        this._router.navigate(['/trycampaign',edmid]);
                        },
                error => this.errorMsg = <any>error
            );
    }
    
    createEdm() {
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

 
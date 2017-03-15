import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute, Params} from '@angular/router';
import {OrganizationService} from '../../app/admin/organization.service'
import {ManageCampaignService} from './managecampaign.service'
import {MenuComponent} from '../../app/home/menu.component'
import {Edm, CommunicationTracker} from '../../app/common/jsonobj.component'
@Component ({
    selector: 'app-assignsender',
    templateUrl: './assignsender.component.html'
  })
export class AssignSenderComponent implements OnInit {
    public errorMsg = '';
    public senderEmail:string = "";
    public senderPassword:string = "";
    public edms:Edm[];
    public selectedEdm:number;
    public prReports:CommunicationTracker[];
    constructor(private manageService: ManageCampaignService, private service: OrganizationService, private _router: Router, private route: ActivatedRoute) {
    }
    ngOnInit() {
        this.getEdms();
    }
    getEdms() {
        this.manageService.getEdms()
                .subscribe(
                           edmList => this.edms = edmList,
                           error =>  this.errorMsg = <any>error);
    }
    updateEdm() {
        let edm = this.edms.filter(edm => edm.edmId == this.selectedEdm)[0];
        console.log(edm);
        edm.senderEmail = this.senderEmail;
        edm.senderPassword = this.senderPassword;
        this.manageService.updateEdm(edm)
        .subscribe(
          result => {},
          error =>  this.errorMsg = <any>error);
    }
    
 }

 
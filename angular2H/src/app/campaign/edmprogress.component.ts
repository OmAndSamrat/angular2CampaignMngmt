import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute, Params} from '@angular/router';
import {OrganizationService} from '../../app/admin/organization.service'
import {ManageCampaignService} from './managecampaign.service'
import {MenuComponent} from '../../app/home/menu.component'
import {Edm, CommunicationTracker} from '../../app/common/jsonobj.component'
@Component ({
    selector: 'app-edmprreport',
    templateUrl: './edmprogress.component.html'
  })
export class EdmProgressComponent implements OnInit {
    public errorMsg = '';
    public edms:Edm[];
    public selectedEdm:number;
    public prReports:CommunicationTracker[];
    constructor(private manageService: ManageCampaignService, private service: OrganizationService, private _router: Router, private route: ActivatedRoute) {
    }
    ngOnInit() {
        this.getEdms();
    }
    getPrReport() {
        this.manageService.getProgresReport(this.selectedEdm)
                         .subscribe(
                           result => this.prReports = result,
                           error =>  this.errorMsg = <any>error);
    }
    getEdms(){
        this.manageService.getEdms()
                .subscribe(
                           edmList => this.edms = edmList,
                           error =>  this.errorMsg = <any>error);
    }
    
 }

 
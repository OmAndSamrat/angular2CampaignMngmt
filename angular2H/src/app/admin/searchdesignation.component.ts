import {Component, OnInit} from "@angular/core";
import {OrganizationService} from './organization.service'
import {Designation, DesignationGroup} from '../../app/common/jsonobj.component'
@Component ({
    selector: 'app-seardesignation',
    templateUrl: './searchdesignation.component.html'
  })
  export class SearchDesignationComponent implements OnInit {
    public errorMsg = '';
    designations: Designation[];
    constructor(private service: OrganizationService) {}
    ngOnInit() {
        console.log("Initiallize search component");
        this.getDomains();
    }
    getDomains() {
        this.service.getDesignations()
        .subscribe(
          designs => this.designations = designs,
          error =>  this.errorMsg = <any>error);
    }
    
    
    
 }


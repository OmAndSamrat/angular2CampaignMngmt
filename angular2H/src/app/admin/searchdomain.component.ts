import {Component, OnInit} from "@angular/core";
import {OrganizationService} from './organization.service'
import {Organization, Domain, Geography, GeographyRes} from '../../app/common/jsonobj.component'
@Component ({
    selector: 'app-seardomain',
    templateUrl: './searchdomain.component.html'
  })
  export class SearchDomainComponent implements OnInit {
    public errorMsg = '';
    domains: Domain[];
    constructor(private service: OrganizationService) {}
    ngOnInit() {
        console.log("Initiallize search component");
        this.getDomains();
    }
    getDomains() {
        this.service.getDomains()
        .subscribe(
          domains => this.domains = domains,
          error =>  this.errorMsg = <any>error);
    }
    
    
    
 }


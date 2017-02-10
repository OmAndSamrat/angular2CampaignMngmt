import {Component, OnInit} from "@angular/core";
import {Router} from '@angular/router';
import {OrganizationService} from './organization.service'
import {Organization, Domain, Geography, GeographyRes} from '../../app/common/jsonobj.component'
@Component ({
    selector: 'app-domain',
    templateUrl: './crdomain.component.html'
  })
  export class CrDomainComponent implements OnInit {
    public errorMsg = '';
    public domain = new Domain(null,'','');
    constructor(private service: OrganizationService, private _router: Router) {}
    ngOnInit() {
        console.log("Initiallize component"+this.domain)
    }
    createDomain() {
        console.log(this.domain)
        this.service.createDomain(this.domain)
                .subscribe(domain => {
                                    this.domain = domain;
                                    console.log('Service Called Subs start');
                                    this._router.navigate(['/searchdomain']);
                                    console.log('Service Called subs end');
                                    
                                    },
                error =>  this.errorMsg = <any>error);
        console.log('Create Org finished');
    }
    
 }
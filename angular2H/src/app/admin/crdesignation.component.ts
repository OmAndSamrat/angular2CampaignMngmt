import {Component, OnInit} from "@angular/core";
import {Router} from '@angular/router';
import {OrganizationService} from './organization.service'
import {Designation, DesignationGroup} from '../../app/common/jsonobj.component'
@Component ({
    selector: 'app-crdesignation',
    templateUrl: './crdesignation.component.html'
  })
  export class CrDesignationComponent implements OnInit {
    public errorMsg = '';
    public designation = new Designation(null, '', new DesignationGroup(null,''));
    designationGroups: DesignationGroup[];
    constructor(private service: OrganizationService, private _router: Router) {}
    ngOnInit() {
        console.log("Initiallize component"+this.designation)
        this.getDesgnGroups();
    }
    getDesgnGroups() {
        this.service.getDesignationGroups()
                         .subscribe(
                           desgGroups => this.designationGroups = desgGroups,
                           error =>  this.errorMsg = <any>error);
      }
    createDesignation() {
        console.log(this.designation)
        this.service.createDesignation(this.designation)
                .subscribe(domain => {
                                    this.designation = domain;
                                    console.log('Service Called Subs start');
                                    this._router.navigate(['/searchdesg']);
                                    console.log('Service Called subs end');
                                    
                                    },
                error =>  this.errorMsg = <any>error);
        console.log('Create Org finished');
    }
    
 }
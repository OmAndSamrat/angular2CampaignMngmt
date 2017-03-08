import {Injectable, Inject} from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import {Designation, GeographyRes, Domain, Organization, DesignationGroup, Contact, SearchOrganization} from '../../app/common/jsonobj.component'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OrganizationService {
    //public url = "http://localhost:8080/";
    //public url = "http://172.16.3.118:8080/";
    public url = window.location.origin+"/";
  constructor(private http: Http) {
  }
  
  getRequestOption() {
      let headers = new Headers({'Accept': 'application/json'});
      let authKey = localStorage.getItem('authKey');
      headers.append("authKey", authKey);
      let options = new RequestOptions({ headers: headers , withCredentials: true});
      console.log(headers);
      return options;
  }
  
  createDesignation(designation): Observable<Designation> {
      return this.http.post(this.url+'campaign/api/designations', designation, this.getRequestOption())
      .map(this.extractData)
      .catch(this.handleError);
  }
  
  createGeo(geo): Observable<GeographyRes> {
      return this.http.post(this.url+'campaign/api/geographies', geo, this.getRequestOption())
      .map(this.extractData)
      .catch(this.handleError);
  }
  
  createDomain(domain): Observable<Domain> {
      return this.http.post(this.url+'campaign/api/domains', domain, this.getRequestOption())
      .map(this.extractData)
      .catch(this.handleError);
  }
  
  createOrganizations(org): Observable<Organization> {
      console.log(org.organisationID);
      if(org.organisationID == '') {
          return this.http.post(this.url+'campaign/api/organizations', org, this.getRequestOption())
          .map(this.extractData)
          .catch(this.handleError);
      } else {
          return this.http.put(this.url+'campaign/api/organizations/'+org.organisationID, org, this.getRequestOption())
          .map(this.extractData)
          .catch(this.handleError);
      }
  }
  
  createContact(contact): Observable<Contact> {
      console.log(contact.contactID);
      if(contact.contactID == '' || contact.contactID == null) {
          return this.http.post(this.url+'campaign/api/organizations/'+contact.organization.organisationID+'/contacts', contact, this.getRequestOption())
          .map(this.extractData)
          .catch(this.handleError);
      } else {
          return this.http.put(this.url+'campaign/api/organizations/'+contact.organization.organisationID+'/contacts', contact, this.getRequestOption())
          .map(this.extractData)
          .catch(this.handleError);
      }
  }
  getOrgContacts(orgid): Observable<Contact[]> {
      return this.http.get(this.url+'campaign/api/organizations/'+orgid+'/contacts', this.getRequestOption())
                      .map(this.extractData)
                      .catch(this.handleError);
  }
  
  getOrgs(): Observable<Organization[]> {
      return this.http.get(this.url+'campaign/api/organizations', this.getRequestOption())
                      .map(this.extractData)
                      .catch(this.handleError);
  }
  
  getOrg(orgid): Observable<Organization> {
      console.log(orgid);
      console.log('check Orgid value '+orgid);
      console.log(orgid != NaN);
      console.log(orgid != 'NaN');
      console.log(!isNaN(orgid));
      if(orgid!=null && !isNaN(orgid)) {
          return this.http.get(this.url+'campaign/api/organizations/'+orgid, this.getRequestOption())
          .map(this.extractData)
          .catch(this.handleError);
      } 
  }
  
  
  seperator(qs) {
      if(qs!='') {
          qs = '&';
      } else {
          qs = '?';
      }
      return qs;
  }
  searchOrg(searchOrg: SearchOrganization):Observable<Organization[]> {
      console.log(' Org Name '+searchOrg.orginazationName);
      console.log(' Geo Id '+searchOrg.geographyId);
      console.log(' domain Id '+searchOrg.domainId);
      let queryString ='';
      if(searchOrg.orginazationName!='') {
          queryString=queryString+this.seperator(queryString)+'orgName='+searchOrg.orginazationName;
      }
      if(searchOrg.geographyId > 0) {
          queryString=queryString+this.seperator(queryString)+'geo='+searchOrg.geographyId;
      }
      if(searchOrg.domainId > 0) {
          queryString=queryString+this.seperator(queryString)+'domain='+searchOrg.domainId;
      }
      return this.http.get(this.url+'campaign/api/organizations/search'+queryString, this.getRequestOption())
      .map(this.extractData)
      .catch(this.handleError);
  }
  
  getDomains(): Observable<Domain[]> {
      return this.http.get(this.url+'campaign/api/domains', this.getRequestOption())
                      .map(this.extractData)
                      .catch(this.handleError);
  }
  
  getGeographysRes (): Observable<GeographyRes[]> {
      return this.http.get(this.url+'campaign/api/geographies', this.getRequestOption())
                      .map(this.extractData)
                      .catch(this.handleError);
    }
  
  getDesignations (): Observable<Designation[]> {
      return this.http.get(this.url+'campaign/api/designations', this.getRequestOption())
                      .map(this.extractData)
                      .catch(this.handleError);
   }
  
  getDesignationGroups (): Observable<DesignationGroup[]> {
      return this.http.get(this.url+'campaign/api/designationgroups', this.getRequestOption())
                      .map(this.extractData)
                      .catch(this.handleError);
   }
  
    private extractData(res: Response) {
        console.log('Retirned Responce is ');
        console.log(res);
        console.log('Responce Got ');
        let body = res.json();
        console.log(body);
        return body || { };
    }
    private handleError (error: Response | any) {
      // In a real world app, we might use a remote logging infrastructure
      let errMsg: string;
      if (error instanceof Response) {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      } else {
        errMsg = error.message ? error.message : error.toString();
      }
      console.error(errMsg);
      return Observable.throw(errMsg);
    }
  
    /*getGeographies() {
      let geographies: GeographyRes[];
      let hash = btoa("samratroy:samratroy");
      console.log(hash);
      let headers = new Headers({'Accept': 'application/json'});
      headers.append("Authorization", "Basic "+hash);
      let options = new RequestOptions({ headers: headers , withCredentials: true});
      console.log(headers);
      this.http.get(this.url+'campaign/api/geographies', options)
      .map((res : Response) => { if(res) { 
          console.log(res);
          console.log(res.json());
          geographies = res.json();
      } })
      .subscribe();
      console.log('service '+geographies)
     return geographies;
  }
  
  getDomains() {
      let domains = [
                         new Domain(1, 'Software' ),
                         new Domain(2, 'Hardware' ),
                         new Domain(3, 'IT' ),
                         new Domain(4, 'Conf')
                      ];
      return domains;
  }*/
}

import {Injectable, Inject} from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import {Campaign, Organization, Contact, SearchQuery, SearchCampaign, Communication, Edm, CommunicationTracker} from '../../app/common/jsonobj.component'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ManageCampaignService {
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
  
  /*seperator(queryString:string) {
     let seperator = ''; 
      if(queryString == '') {
          this.seperator = '?'
      } else {
          this.seperator = '&'
      }
      return this.seperator;
  }*/
  
  seperator(qs) {
      if(qs!='') {
          qs = '&';
      } else {
          qs = '?';
      }
      return qs;
  }
  
  searchCampaigns(searchQuery: SearchCampaign) : Observable<Campaign[]> {

      console.log('Manage Campaign Service Called and Query Object is '+searchQuery);
      console.log(' First Name '+searchQuery.campaignName);
      console.log(' Last Name '+searchQuery.campaignStartDateFrom);
      console.log(' Email Name '+searchQuery.campaignStartDateTo);
      let queryString ='';
      if(searchQuery.campaignName!='') {
          queryString=queryString+this.seperator(queryString)+'firstName='+searchQuery.campaignName;
      }
      if(searchQuery.campaignStartDateFrom!='') {
          queryString=queryString+this.seperator(queryString)+'lastName='+searchQuery.campaignStartDateFrom;
      }
      if(searchQuery.campaignStartDateTo!='') {
          queryString=queryString+this.seperator(queryString)+'email='+searchQuery.campaignStartDateTo;
      }
      if(searchQuery.campaignEndDateFrom!='') {
          queryString=queryString+this.seperator(queryString)+'designationId='+searchQuery.campaignEndDateFrom;
      }
      if(searchQuery.campaignEndDateTo!='') {
          queryString=queryString+this.seperator(queryString)+'orgId='+searchQuery.campaignEndDateTo;
      }
      console.log(queryString);
      //TODO 
      //When record will grow we will have to provide search facility.
      //return this.http.get(url+'campaign/api/campaigns/'+queryString, this.getRequestOption())
      return this.http.get(this.url+'campaign/api/campaigns', this.getRequestOption())
      .map(this.extractData)
      .catch(this.handleError);
    
  }
  
  searchContacts(searchQuery: SearchQuery, campaignId) : Observable<Contact[]> {
      console.log('Manage Campaign Service Called and Query Object is '+searchQuery);
      console.log(' First Name '+searchQuery.firstName);
      console.log(' Last Name '+searchQuery.lastName);
      console.log(' Email Name '+searchQuery.email);
      let queryString ='';
      if(searchQuery.firstName!='') {
          queryString=queryString+this.seperator(queryString)+'firstName='+searchQuery.firstName;
      }
      if(searchQuery.lastName!='') {
          queryString=queryString+this.seperator(queryString)+'lastName='+searchQuery.lastName;
      }
      if(searchQuery.email!='') {
          queryString=queryString+this.seperator(queryString)+'email='+searchQuery.email;
      }
      if(searchQuery.designationId>0) {
          queryString=queryString+this.seperator(queryString)+'designationId='+searchQuery.designationId;
      }
      if(searchQuery.orgId>0) {
          queryString=queryString+this.seperator(queryString)+'orgId='+searchQuery.orgId;
      }
      if(searchQuery.designationGrpId>0) {
          queryString=queryString+this.seperator(queryString)+'designationGrpId='+searchQuery.designationGrpId;
      }
      if(searchQuery.gender!='') {
          queryString=queryString+this.seperator(queryString)+'gender='+searchQuery.gender;
      }
      if(searchQuery.index!='') {
          queryString=queryString+this.seperator(queryString)+'index='+searchQuery.index;
      }
      console.log(queryString);
      return this.http.get(this.url+'campaign/api/contacts/'+campaignId+queryString, this.getRequestOption())
      .map(this.extractData)
      .catch(this.handleError);
    }
  
    createCampaign(camapaign): Observable<Campaign> {
        if(camapaign.campaignID=='' || camapaign.campaignID==null) {
            return this.http.post(this.url+'campaign/api/campaigns', camapaign, this.getRequestOption())
            .map(this.extractData)
            .catch(this.handleError); 
        } else {
            return this.http.put(this.url+'campaign/api/campaigns/'+camapaign.campaignID, camapaign, this.getRequestOption())
            .map(this.extractData)
            .catch(this.handleError);
        }
    }
    
    createEdm(edm): Observable<Edm> {
        if(edm.edmId=='' || edm.edmId==null) {
            return this.http.post(this.url+'campaign/api/campaigns/'+edm.campaign.campaignID+'/edms', edm, this.getRequestOption())
            .map(this.extractData)
            .catch(this.handleError); 
        } else {
            return this.http.put(this.url+'campaign/api/campaigns/'+edm.campaign.campaignID+'/edms'+edm.edmId, edm, this.getRequestOption())
            .map(this.extractData)
            .catch(this.handleError);
        }
    }
    
    createBulkCommunicationInCampaign(campaignId, communications) : Observable<Communication[]> {
        return this.http.post(this.url+'campaign/api/campaigns/'+campaignId+'/communications', communications, this.getRequestOption())
        .map(this.extractData)
        .catch(this.handleError); 
    }
    
    deleteCampaignCommunication(campaignId, communicationId) : Observable<string> {
        return this.http.delete(this.url+'campaign/api/campaigns/'+campaignId+'/communications/'+communicationId, this.getRequestOption())
        .map(this.extractData)
        .catch(this.handleError); 
    }
    
    getCampaign(campaignId) : Observable<Campaign> {
        return this.http.get(this.url+'campaign/api/campaigns/'+campaignId, this.getRequestOption())
        .map(this.extractData)
        .catch(this.handleError);
    }
    
    getEdms() : Observable<Edm[]> {
        return this.http.get(this.url+'campaign/api/campaigns/1/edms', this.getRequestOption())
        .map(this.extractData)
        .catch(this.handleError);
    }
    
    updateEdm(edm:Edm) : Observable<Edm[]> {
        return this.http.post(this.url+'campaign/api/campaigns/edmupdate', edm,this.getRequestOption())
        .map(this.extractData)
        .catch(this.handleError);
    }
    
    getProgresReport(edmId) : Observable<CommunicationTracker[]> {
        return this.http.get(this.url+'campaign/api/campaigns/'+edmId+'/prreport', this.getRequestOption())
        .map(this.extractData)
        .catch(this.handleError);
    }
    
    getCampaignContacts(campaignId):Observable<Communication[]> {
        return this.http.get(this.url+'campaign/api/campaigns/'+campaignId+'/communications', this.getRequestOption())
        .map(this.extractData)
        .catch(this.handleError);
    }
    
    getEdm(edmid) : Observable<Edm> {
        return this.http.get(this.url+'campaign/api/campaigns/edms/'+edmid, this.getRequestOption())
        .map(this.extractData)
        .catch(this.handleError);
    }
    
    tryCampaign(campaignId, edmId):Observable<string> {
        return this.http.post(this.url+'campaign/api/campaigns/'+campaignId+'/edms/'+edmId+'/try', '', this.getRequestOption())
        .map(this.extractData)
        .catch(this.handleError);
    }
    executeCampaign(campaignId, edmId):Observable<string> {
        return this.http.post(this.url+'campaign/api/campaigns/'+campaignId+'/edms/'+edmId+'/execute', '', this.getRequestOption())
        .map(this.extractData)
        .catch(this.handleError);
    }
    
    updateEdmFile(edmId, file: File, subject:string):Observable<string> {
            let formData:FormData = new FormData();
            formData.append('uploadFile', file, file.name);
            formData.append('subject', subject);
            let headers = new Headers();
            let authKey = localStorage.getItem('authKey');
            headers.append("authKey", authKey);
            //headers.append('Content-Type', 'multipart/form-data; boundry');
            let options = new RequestOptions({ headers: headers });
            return this.http.put(this.url+'campaign/api/campaigns/1/edms/'+edmId, formData, options)
                .map(this.extractData)
                .catch(this.handleError)
    }
    
    createEdmFile(compaignId, file: File, subject:string):Observable<string> {
        let formData:FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        formData.append('subject', subject);
        
        let headers = new Headers();
        let authKey = localStorage.getItem('authKey');
        headers.append("authKey", authKey);
        //headers.append('Content-Type', 'multipart/form-data; boundry');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.url+'campaign/api/campaigns/'+compaignId+'/edms', formData, options)
            .map(this.extractData)
            .catch(this.handleError)
}
    
    getMultipartRequestOption() {
        let hash = btoa("samratroy:samratroy");
        console.log(hash);
        let headers = new Headers({'Accept': 'application/json'});
        headers.append('Content-Type', 'multipart/form-data');
        let authKey = localStorage.getItem('authKey');
        headers.append("authKey", authKey);
        let options = new RequestOptions({ headers: headers , withCredentials: true});
        console.log(headers); 
        return options;
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
          var err = '';
          if (error.status === 403) {
              err = 'You are not authorised to perform this action';
          } else if (error.status === 500) {
              err = 'Due to some internal error action could not perform. Contact your administrator.';
          } else {
              const body = error.text() || '';
              err = JSON.stringify(body);
          }
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      } else {
        errMsg = error.message ? error.message : error.toString();
      }console.log(errMsg);
      return Observable.throw(errMsg);
    }
}

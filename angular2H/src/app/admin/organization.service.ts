import {Injectable, Inject} from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';

export class Organization {
    constructor(public domain: string, public geography: string, public organization: string, public orgid:string) {}
}

@Injectable()
export class LoginService {
  constructor() {
  }
}

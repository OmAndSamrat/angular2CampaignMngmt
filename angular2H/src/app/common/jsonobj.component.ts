
export class Organization {
    constructor(public domain: Domain, public geography: GeographyRes, 
            public organisation: string, public organisationID:string, 
            public organisationRemark:string, public organisationFirstName:string) {}
}
export class Contact {
    constructor(public contactID: number, public contactName: string, 
            public firstName: string, public gender:string, 
            public surName:string, public email:string,
            public designation:Designation, public organization:Organization,
            public primaryPhone:string, public secondaryPhone:string
            ) {}
}
export class DesignationGroup {
    constructor(public designationGroupId:number, public designationGroup:string) {}
}

export class Designation {
    constructor (public designationId:number, public designation:string, public designationGroup:DesignationGroup) {}
}

export class Geography {
    constructor(public id: number, public name: string) { }
}
export class Domain {
      constructor(public domainID: number, public domainName: string, public domainDescription: string) { }
}

export class GeographyRes {
    constructor(public geographyID: number, public geographyName: string) { }
}

export class Gender {
    constructor(public gender: String, public genderLabel: string) { }
}

export class SearchQuery {
    constructor(public firstName:string, public lastName:string,
            public email:string, public designationId:string,
            public orgId:string, public designationGrpId:string,
            public gender:string, public index:string,
            public count:string, public domainId:string, public geographyId:string)
                {}
}

export class Campaign {
    constructor(public campaignID:number, public status:Status,
            public campaignStartDate:string, public campaignEndDate:string,
            public campaignName:string, public campaignDescription:string
            ){}
    
}

export class Status {
    constructor(public statusID:number, public statusDesc:string){}
}

export class SearchCampaign {
    constructor(public campaignName:string, public campaignStartDateFrom:string,
            public campaignStartDateTo:string, public campaignEndDateFrom:string,
            public campaignEndDateTo:string
            ){}
}

export class Communication {
    constructor(public communicationID:number, public contact:Contact, public campaign:Campaign){}
}

export class SelectableCommuication {
    constructor(public communication:Communication, public isAssignedToCampaign:boolean){}
}

export class Edm {
    constructor (public edmId:number,public campaign:Campaign,public subject:string, public status: Status){}
}



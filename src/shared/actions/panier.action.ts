import { Reference } from "../models/reference";

export class AddReference {
    static readonly type = "[Reference] Add"; // indicatif
    constructor(public payload: Reference) {

    }
}

export class DelReference {
    static readonly type = "[Reference] Del"; // indicatif
    constructor(public payload: Reference) {
        
    }
}
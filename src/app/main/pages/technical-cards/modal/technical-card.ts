export interface FreshAirResponse {
    errorMessage: string;
    successMessage: string;
    validationErrors: string[];
}

export class FreshAirRequest {
    quantity:number;
    length: number;
    area: number;
    height: number;
    width: number;
    projectId: number;
    levelId: number;
    technicalCardId: number;
    parameterId: number;
    parameterType:number;
    id:number;
    load:number;
    spaceId:number;
}



export class Level {
    levelName: string;
    parameters:SpaceLeave[]
}

export class SpaceLeave {
    id:number
    parameterName:string;
    levelName: string;
    quantity:number;
    length:number;
    area: number;
    height:number;
    width:number;
    levelId:number;
    parameterId:number;
}

export class ApartmentRequest {
    id:number
    load: number;
    quantity:number;
    spaceId:number;
    projectId:number;
    technicalCardId:number
    parameterId:number;
    elements:[];
}

export class ElementArrayRequest {
    load: number;
    quantity:number;
    spaceId:number;
    projectId:number;
    technicalCardId:number
    parameterId:number;
}
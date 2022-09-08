export class SpaceMatrixElementResponse{
    spaceMatrixElements : SpaceMatrixElements[];
    errorMessage: string;
    successMessage: string;
    validationErrors: string[];   
}

export interface SpaceMatrixElements{
    id:number;
    roomId:number;
    projectId:number;
    projectName: string;
    floorLevel: string;
    element : string;
    level: string;
    specific : string;
    material : string;
    brand: string;
    supplier : string;
    remarks : string;
    generalImpact: string;
    discipline: string;
}

export class AddSpaceMatrixElementRequest{
    roomId:number;
    projectId:number;
    projectName: string;
    floorLevel: string;
    element : string;
    level: string;
    specific : string;
    material : string;
    brand: string;
    supplier : string;
    remarks : string;
    generalImpact: string;
    discipline: string;
}


export interface AddSpaceMatrixElementResponse{
    spaceMatrixElement: SpaceMatrixElement[];
    errorMessage: string;
    successMessage: string;
    validationErrors: string[];
}



export interface SpaceMatrixElement{
    roomId:number;
    projectId:number;
    projectName: string;
    floorLevel: string;
    element : string;
    level: string;
    specific : string;
    material : string;
    brand: string;
    supplier : string;
    remarks : string;
    generalImpact: string;
    discipline: string;
}

export class ElementLevel {
    
    id: string;
    name: string;
  }

  export class Element {    
    id: string;
    name: string;
  }

  export class FloorLevel{
    id: string;
    name: string;
  }

  export class Specific{
    id:string;
    name : string;
  }
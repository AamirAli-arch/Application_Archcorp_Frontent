export class TaskShift{
    location: string;
    taskResourceId: number;
    type: number;
    id : number;
    note: string;
    isTaskCompleted: boolean
}

export class Coordinates{
    latitude: number;
    longitude: number;
}

export class TimeSheetResponse{
    errorMessage: string;
    successMessage: string;
    timeSheet: TimeSheet;
}

export class TimeSheet{
    id: number;
    checkIn: string;
    checkInNotes: string;
    checkOut: string;
    checkOutNotes: string;
    checkInLocation: string;
    checkOutLocation: string;
    taskResourceId: number;
    isInProgress: boolean;
}


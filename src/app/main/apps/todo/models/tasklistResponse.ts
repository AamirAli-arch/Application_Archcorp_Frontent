import { Task } from "./task";

export class TaskListRsponse{
    errorMessage: string;
    successMessage: string;
    tasks: Task[]
}

export class TaskCheckInResponse {
    checkIn: CheckIn;
    errorMessage: string;
    successMessage: string;
}

export class CheckIn {
    id: number;
    dateTime: string;
}

export class TaskCheckOutResponse {
    id: number;
    errorMessage: string;
    successMessage: string;
}
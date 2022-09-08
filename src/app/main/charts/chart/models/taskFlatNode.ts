/** Flat node with expandable and level information */
import { TaskResourceDto } from '../services/ApiServices';
export class TaskFlatNode {
  constructor(
    public id: number,
    public createdBy: number,
    public parentTaskId: number,
    public expandable: boolean, 
    public level: number,
    public name: string, 
    public progress: number,
    public resource: TaskResourceDto[],
    public startDate: Date,
    public endDate: Date,
    public verb: string,
    public duration: number,
    public expanded: boolean,
    public days: number,
    public start: number,
    public end: number) { }
}

import { ProjectDto, TaskResourceDto, TaskDto } from '../services/ApiServices'

export class ProjectView {
    name: string;
    days:number;
    taskType:string;
    projectId:number;
    completedDate:string;
    tasks:ProjectView[];
    id:number;
    expandable:boolean;
  }
  
  export class TaskRequest{
    name?: string | undefined;
    startDate?: Date;
    endDate?: Date;
    progress?: number;
    duration?: number;
    verb?: string | undefined;
    parentTaskId?: number | undefined;
    projectId?: number;
    id?: number;
  }

  export class Task {
    constructor(expanded: boolean = true) {
        this.expanded = expanded;
     }

    id?: number;
    isActive?: boolean;
    name?: string | undefined;
    startDate?: Date;
    endDate?: Date;
    progress?: number;
    duration?: number;
    completedDate?: Date;
    createdDate?: Date;
    taskType?: string | undefined;
    parentTaskId?: number | undefined;
    createdBy?: string;
    projectId?: number;
    project?: ProjectDto;
    resources?: TaskResourceDto[] | undefined;
    taskNavigation?: TaskDto;
    tasks?: Task[] | undefined;
    expanded: boolean;
    verb: string;
    days: number;
    start: number;
    end: number;
}
  
export class TaskRequestDelete{
    name?: string | undefined;
    startDate?: Date;
    endDate?: Date;
    progress?: number;
    duration?: number;
    verb?: string | undefined;
    parentTaskId?: number | undefined;
    id?: number;
    projectId?: number;
}


export class CreateProject  {
    projectCode?: string | undefined;
    projectName?: string | undefined;
    startDate?: Date;
    endDate?: Date;
    location?: string | undefined;
    projectType : number | undefined;
    id?: number;
}
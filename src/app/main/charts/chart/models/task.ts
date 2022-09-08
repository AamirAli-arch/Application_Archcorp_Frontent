import { ProjectDto, TaskResourceDto, TaskDto } from '../services/ApiServices'

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

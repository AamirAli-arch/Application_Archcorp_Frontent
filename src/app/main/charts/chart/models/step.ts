import { Identifiers } from "@angular/compiler";

export class Step {
  id: number;
  name: string;
  progress: number;
  resource: User[];
  progressDates: string[];
  dates: {
    start: string;
    end: string;
  };
  steps: Step[];
  expanded: boolean; // status of expanded
}

export class User {
  id: number;
  image: string;
  name: string;
  initials: string;
  allocatedHours: number;
  disciplineId: number;
  professionId: number;
}

export class Link {
  id: number;
  project: number;
  from: number;
  to: number;
}

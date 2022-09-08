/** Flat node with expandable and level information */
import {User} from './step'
export class StepFlatNode {
  constructor(
    public id: number,
    public expandable: boolean, public level: number,
    public name: string, public progress: number,
    public progressDates: string[],
    public resource: User[],
    public dates: {
      start: string;
      end: string;
    },
    public expanded: boolean) { }
}

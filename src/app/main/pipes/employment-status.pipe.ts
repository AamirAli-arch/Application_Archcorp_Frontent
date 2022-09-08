import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "employMentStatus",
})
export class EmploymentStatusPipe implements PipeTransform {
    transform(value: number): string {
        // Consultant = 1,
        if (value == 0) {
            return "Consultant";
        }
        if (value == 2) {
            return "Intern";
        }
        if (value == 3) {
            return "OnContract";
        }
        if (value == 4) {
            return "Permanent";
        }
        if (value == 5) {
            return "Temporary";
        }
        if (value == 6) {
            return "Trainee";
        }
        if (value == 7) {
            return "Probation";
        }
    }
}

import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewChild,
} from "@angular/core";


@Component({
  selector: 'app-budget-number',
  templateUrl: './budget-number.component.html',
  styleUrls: ['./budget-number.component.scss']
})
export class BudgetNumberComponent implements AfterViewInit, OnChanges {
    @Input() duration: number;
    @Input() digit: number;
    @Input() steps: number;
    @ViewChild("budgeteDigit") budgeteDigit: ElementRef;

    animateCount() {
        if (!this.duration) {
            this.duration = 1000;
        }
         //console.log("this.budgeteDigit", this.budgeteDigit, this.duration);
        if (typeof this.digit === "number") {
            this.counterFunc(this.digit, this.duration, this.budgeteDigit);
        }
    }

    counterFunc(endValue, durationMs, element) {
        if (!this.steps) {
            this.steps = 12;
        }

        const stepCount = Math.abs(durationMs / this.steps);
        const valueIncrement = (endValue - 0) / stepCount;
        const sinValueIncrement = Math.PI / stepCount;

        let currentValue = 0;
        let currentSinValue = 0;

        function step() {
            currentSinValue += sinValueIncrement;
            currentValue += valueIncrement * Math.sin(currentSinValue) ** 2 * 2;

            element.nativeElement.textContent = Math.abs(
                Math.floor(currentValue)
            );

            if (currentSinValue < Math.PI) {
                window.requestAnimationFrame(step);
            }
        }

        step();
    }
    ngAfterViewInit() {
        if (this.digit) {
            this.animateCount();
        }
    }
    ngOnChanges(changes: SimpleChanges) {
        if (changes["digit"]) {
            this.animateCount();
        }
    }
}
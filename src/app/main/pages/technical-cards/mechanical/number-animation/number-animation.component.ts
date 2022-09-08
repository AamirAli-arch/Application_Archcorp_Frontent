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
    selector: "app-number-animation",
    templateUrl: "./number-animation.component.html",
    styleUrls: ["./number-animation.component.scss"],
})
export class NumberAnimationComponent implements AfterViewInit, OnChanges {
    @Input() duration: number;
    @Input() digit: number;
    @Input() steps: number;
    @ViewChild("animatedDigit") animatedDigit: ElementRef;

    animateCount() {
        if (!this.duration) {
            this.duration = 1000;
        }
        // console.log("this.animatedDigit", this.animatedDigit, this.duration);
        if (typeof this.digit === "number") {
            this.counterFunc(this.digit, this.duration, this.animatedDigit);
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

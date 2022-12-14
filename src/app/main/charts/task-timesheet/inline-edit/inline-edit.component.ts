import { Component, Host, Input, OnInit, Optional } from '@angular/core';
import { SatPopover } from '@ncstate/sat-popover';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-inline-edit',
  styleUrls: ['./inline-edit.component.scss'],
  template: `
    <form (ngSubmit)="onSubmit()" style="z-index:99999">
      <div class="mat-subheading-2">Add a comment</div>
      
      <mat-form-field>
        <input matInput maxLength="140" name="hours" [(ngModel)]="hours">
        <mat-hint align="end">{{hours?.length || 0}}/140</mat-hint>
      </mat-form-field>

      <div class="actions">
        <button mat-button type="button" color="primary" (click)="onCancel()">CANCEL</button>
        <button mat-button type="submit" color="primary">SAVE</button>
      </div>
    </form>
  `
})
export class InlineEditComponent implements OnInit {

  /** Overrides the comment and provides a reset value when changes are cancelled. */
  @Input()
  get value(): string { return this._value; }
  set value(x: string) {
    this.hours = this._value = x;
  }
  private _value = '';

  /** Form model for the input. */
  hours = '';

  constructor(@Optional() @Host() public popover: SatPopover) { }

  ngOnInit(): void {
     // subscribe to cancellations and reset form value
     if (this.popover) {
      this.popover.closed.pipe(filter(val => val == null))
        .subscribe(() => this.hours = this.value || '');
    }
  }

  onSubmit() {
    if (this.popover) {
      this.popover.close(this.hours);
    }
  }

  onCancel() {
    if (this.popover) {
      this.popover.close();
    }
  }

}

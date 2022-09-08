import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetCalenderComponent } from './timesheet-calender.component';

describe('TimesheetCalenderComponent', () => {
  let component: TimesheetCalenderComponent;
  let fixture: ComponentFixture<TimesheetCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimesheetCalenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

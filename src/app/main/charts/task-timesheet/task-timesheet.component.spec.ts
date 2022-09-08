import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTimesheetComponent } from './task-timesheet.component';

describe('TaskTimesheetComponent', () => {
  let component: TaskTimesheetComponent;
  let fixture: ComponentFixture<TaskTimesheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskTimesheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskTimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

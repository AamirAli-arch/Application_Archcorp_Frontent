import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksTimesheetComponent } from './tasks-timesheet.component';

describe('TasksTimesheetComponent', () => {
  let component: TasksTimesheetComponent;
  let fixture: ComponentFixture<TasksTimesheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksTimesheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksTimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

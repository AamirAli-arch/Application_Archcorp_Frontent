import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTimelineComponent } from './employee-timeline.component';

describe('EmployeeTimelineComponent', () => {
  let component: EmployeeTimelineComponent;
  let fixture: ComponentFixture<EmployeeTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeTimelineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

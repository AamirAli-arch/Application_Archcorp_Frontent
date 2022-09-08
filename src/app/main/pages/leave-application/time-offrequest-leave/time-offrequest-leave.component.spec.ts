import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeOffrequestLeaveComponent } from './time-offrequest-leave.component';

describe('TimeOffrequestLeaveComponent', () => {
  let component: TimeOffrequestLeaveComponent;
  let fixture: ComponentFixture<TimeOffrequestLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeOffrequestLeaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeOffrequestLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

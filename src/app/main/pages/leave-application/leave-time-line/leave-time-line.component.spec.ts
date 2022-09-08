import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveTimeLineComponent } from './leave-time-line.component';

describe('LeaveTimeLineComponent', () => {
  let component: LeaveTimeLineComponent;
  let fixture: ComponentFixture<LeaveTimeLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveTimeLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveTimeLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

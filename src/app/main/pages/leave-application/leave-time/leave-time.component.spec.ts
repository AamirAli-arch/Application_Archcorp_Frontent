import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveTimeComponent } from './leave-time.component';

describe('LeaveTimeComponent', () => {
  let component: LeaveTimeComponent;
  let fixture: ComponentFixture<LeaveTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

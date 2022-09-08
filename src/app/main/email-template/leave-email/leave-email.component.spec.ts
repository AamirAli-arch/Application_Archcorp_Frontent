import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveEmailComponent } from './leave-email.component';

describe('LeaveEmailComponent', () => {
  let component: LeaveEmailComponent;
  let fixture: ComponentFixture<LeaveEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

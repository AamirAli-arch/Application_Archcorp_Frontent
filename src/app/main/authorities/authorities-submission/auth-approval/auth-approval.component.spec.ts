import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthApprovalComponent } from './auth-approval.component';

describe('AuthApprovalComponent', () => {
  let component: AuthApprovalComponent;
  let fixture: ComponentFixture<AuthApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

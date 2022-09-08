import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthoritiesSubmissionComponent } from './authorities-submission.component';

describe('AuthoritiesSubmissionComponent', () => {
  let component: AuthoritiesSubmissionComponent;
  let fixture: ComponentFixture<AuthoritiesSubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthoritiesSubmissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthoritiesSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

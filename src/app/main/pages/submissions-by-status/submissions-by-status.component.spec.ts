import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionsByStatusComponent } from './submissions-by-status.component';

describe('SubmissionsByStatusComponent', () => {
  let component: SubmissionsByStatusComponent;
  let fixture: ComponentFixture<SubmissionsByStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmissionsByStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionsByStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

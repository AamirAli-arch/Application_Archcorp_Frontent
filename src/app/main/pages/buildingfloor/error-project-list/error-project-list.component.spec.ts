import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorProjectListComponent } from './error-project-list.component';

describe('ErrorProjectListComponent', () => {
  let component: ErrorProjectListComponent;
  let fixture: ComponentFixture<ErrorProjectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorProjectListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

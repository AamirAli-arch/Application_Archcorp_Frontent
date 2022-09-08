import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectscopeComponent } from './add-projectscope.component';

describe('AddProjectscopeComponent', () => {
  let component: AddProjectscopeComponent;
  let fixture: ComponentFixture<AddProjectscopeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProjectscopeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectscopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

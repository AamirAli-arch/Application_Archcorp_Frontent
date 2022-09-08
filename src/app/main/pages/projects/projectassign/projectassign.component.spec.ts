import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectassignComponent } from './projectassign.component';

describe('ProjectassignComponent', () => {
  let component: ProjectassignComponent;
  let fixture: ComponentFixture<ProjectassignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectassignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectassignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

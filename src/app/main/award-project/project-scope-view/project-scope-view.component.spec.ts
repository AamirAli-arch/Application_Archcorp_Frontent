import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectScopeViewComponent } from './project-scope-view.component';

describe('ProjectScopeViewComponent', () => {
  let component: ProjectScopeViewComponent;
  let fixture: ComponentFixture<ProjectScopeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectScopeViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectScopeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

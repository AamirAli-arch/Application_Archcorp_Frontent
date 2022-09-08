import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectLevelComponent } from './project-level.component';

describe('ProjectLevelComponent', () => {
  let component: ProjectLevelComponent;
  let fixture: ComponentFixture<ProjectLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

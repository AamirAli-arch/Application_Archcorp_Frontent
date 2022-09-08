import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsCurrentResourcesComponent } from './projects-current-resources.component';

describe('ProjectsCurrentResourcesComponent', () => {
  let component: ProjectsCurrentResourcesComponent;
  let fixture: ComponentFixture<ProjectsCurrentResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsCurrentResourcesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsCurrentResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPmrsDashboardComponent } from './project-pmrs-dashboard.component';

describe('ProjectPmrsDashboardComponent', () => {
  let component: ProjectPmrsDashboardComponent;
  let fixture: ComponentFixture<ProjectPmrsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectPmrsDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectPmrsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

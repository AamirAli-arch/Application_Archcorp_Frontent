import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSearchDropdownComponent } from './project-search-dropdown.component';

describe('ProjectSearchDropdownComponent', () => {
  let component: ProjectSearchDropdownComponent;
  let fixture: ComponentFixture<ProjectSearchDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectSearchDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSearchDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

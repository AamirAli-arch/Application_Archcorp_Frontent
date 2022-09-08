import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceProjectsComponent } from './resource-projects.component';

describe('ResourceProjectsComponent', () => {
  let component: ResourceProjectsComponent;
  let fixture: ComponentFixture<ResourceProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceProjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedActivitiesComponent } from './completed-activities.component';

describe('CompletedActivitiesComponent', () => {
  let component: CompletedActivitiesComponent;
  let fixture: ComponentFixture<CompletedActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedActivitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

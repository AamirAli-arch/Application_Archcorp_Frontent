import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivePendingActivitiesComponent } from './active-pending-activities.component';

describe('ActivePendingActivitiesComponent', () => {
  let component: ActivePendingActivitiesComponent;
  let fixture: ComponentFixture<ActivePendingActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivePendingActivitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivePendingActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

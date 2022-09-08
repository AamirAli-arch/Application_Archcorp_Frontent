import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevitTrackingComponent } from './revit-tracking.component';

describe('RevitTrackingComponent', () => {
  let component: RevitTrackingComponent;
  let fixture: ComponentFixture<RevitTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevitTrackingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevitTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

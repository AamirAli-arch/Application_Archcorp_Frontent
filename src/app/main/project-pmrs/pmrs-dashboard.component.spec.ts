import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmrsDashboardComponent } from './pmrs-dashboard.component';

describe('PmrsDashboardComponent', () => {
  let component: PmrsDashboardComponent;
  let fixture: ComponentFixture<PmrsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmrsDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmrsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTimeupdateComponent } from './report-timeupdate.component';

describe('ReportTimeupdateComponent', () => {
  let component: ReportTimeupdateComponent;
  let fixture: ComponentFixture<ReportTimeupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportTimeupdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTimeupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

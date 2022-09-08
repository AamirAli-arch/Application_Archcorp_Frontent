import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GanttReportComponent } from './gantt-report.component';

describe('GanttReportComponent', () => {
  let component: GanttReportComponent;
  let fixture: ComponentFixture<GanttReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GanttReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GanttReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

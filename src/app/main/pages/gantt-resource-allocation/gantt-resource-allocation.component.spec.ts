import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GanttResourceAllocationComponent } from './gantt-resource-allocation.component';

describe('GanttResourceAllocationComponent', () => {
  let component: GanttResourceAllocationComponent;
  let fixture: ComponentFixture<GanttResourceAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GanttResourceAllocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GanttResourceAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

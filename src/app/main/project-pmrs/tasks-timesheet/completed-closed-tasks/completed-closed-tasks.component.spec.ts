import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedClosedTasksComponent } from './completed-closed-tasks.component';

describe('CompletedClosedTasksComponent', () => {
  let component: CompletedClosedTasksComponent;
  let fixture: ComponentFixture<CompletedClosedTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedClosedTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedClosedTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

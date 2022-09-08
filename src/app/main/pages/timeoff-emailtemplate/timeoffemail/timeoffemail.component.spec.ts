import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeoffemailComponent } from './timeoffemail.component';

describe('TimeoffemailComponent', () => {
  let component: TimeoffemailComponent;
  let fixture: ComponentFixture<TimeoffemailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeoffemailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeoffemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

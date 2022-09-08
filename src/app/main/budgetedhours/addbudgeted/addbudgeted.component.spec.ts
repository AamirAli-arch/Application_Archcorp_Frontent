import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbudgetedComponent } from './addbudgeted.component';

describe('AddbudgetedComponent', () => {
  let component: AddbudgetedComponent;
  let fixture: ComponentFixture<AddbudgetedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddbudgetedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddbudgetedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

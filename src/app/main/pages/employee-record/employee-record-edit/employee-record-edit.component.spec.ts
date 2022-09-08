import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRecordEditComponent } from './employee-record-edit.component';

describe('EmployeeRecordEditComponent', () => {
  let component: EmployeeRecordEditComponent;
  let fixture: ComponentFixture<EmployeeRecordEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeRecordEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeRecordEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

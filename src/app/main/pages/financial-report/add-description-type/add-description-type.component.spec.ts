import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDescriptionTypeComponent } from './add-description-type.component';

describe('AddDescriptionTypeComponent', () => {
  let component: AddDescriptionTypeComponent;
  let fixture: ComponentFixture<AddDescriptionTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDescriptionTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDescriptionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

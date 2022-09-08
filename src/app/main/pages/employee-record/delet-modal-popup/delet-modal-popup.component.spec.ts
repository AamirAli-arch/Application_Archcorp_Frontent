import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletModalPopupComponent } from './delet-modal-popup.component';

describe('DeletModalPopupComponent', () => {
  let component: DeletModalPopupComponent;
  let fixture: ComponentFixture<DeletModalPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletModalPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletModalPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentLoadComponent } from './apartment-load.component';

describe('ApartmentLoadComponent', () => {
  let component: ApartmentLoadComponent;
  let fixture: ComponentFixture<ApartmentLoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApartmentLoadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApartmentLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

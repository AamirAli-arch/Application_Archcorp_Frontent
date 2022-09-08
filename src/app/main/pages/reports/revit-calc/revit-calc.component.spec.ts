import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevitCalcComponent } from './revit-calc.component';

describe('RevitCalcComponent', () => {
  let component: RevitCalcComponent;
  let fixture: ComponentFixture<RevitCalcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevitCalcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevitCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

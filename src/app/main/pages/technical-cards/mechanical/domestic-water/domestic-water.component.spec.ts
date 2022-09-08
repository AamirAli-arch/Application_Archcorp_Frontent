import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomesticWaterComponent } from './domestic-water.component';

describe('DomesticWaterComponent', () => {
  let component: DomesticWaterComponent;
  let fixture: ComponentFixture<DomesticWaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DomesticWaterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DomesticWaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MechanicalEquipmentComponent } from './mechanical-equipment.component';

describe('MechanicalEquipmentComponent', () => {
  let component: MechanicalEquipmentComponent;
  let fixture: ComponentFixture<MechanicalEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MechanicalEquipmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MechanicalEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

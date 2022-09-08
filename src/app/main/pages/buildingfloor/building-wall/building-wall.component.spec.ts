import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingWallComponent } from './building-wall.component';

describe('BuildingWallComponent', () => {
  let component: BuildingWallComponent;
  let fixture: ComponentFixture<BuildingWallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildingWallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

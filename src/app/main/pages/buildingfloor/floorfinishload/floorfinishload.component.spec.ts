import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorfinishloadComponent } from './floorfinishload.component';

describe('FloorfinishloadComponent', () => {
  let component: FloorfinishloadComponent;
  let fixture: ComponentFixture<FloorfinishloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FloorfinishloadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FloorfinishloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

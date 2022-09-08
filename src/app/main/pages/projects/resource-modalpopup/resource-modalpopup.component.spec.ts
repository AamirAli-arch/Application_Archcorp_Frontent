import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceModalpopupComponent } from './resource-modalpopup.component';

describe('ResourceModalpopupComponent', () => {
  let component: ResourceModalpopupComponent;
  let fixture: ComponentFixture<ResourceModalpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceModalpopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceModalpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

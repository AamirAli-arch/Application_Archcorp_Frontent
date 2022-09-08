import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleProjectdropdownComponent } from './single-projectdropdown.component';

describe('SingleProjectdropdownComponent', () => {
  let component: SingleProjectdropdownComponent;
  let fixture: ComponentFixture<SingleProjectdropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleProjectdropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleProjectdropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

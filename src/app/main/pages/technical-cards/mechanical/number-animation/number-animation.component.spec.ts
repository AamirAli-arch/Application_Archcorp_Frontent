import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberAnimationComponent } from './number-animation.component';

describe('NumberAnimationComponent', () => {
  let component: NumberAnimationComponent;
  let fixture: ComponentFixture<NumberAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberAnimationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

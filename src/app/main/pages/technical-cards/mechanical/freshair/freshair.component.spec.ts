import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreshairComponent } from './freshair.component';

describe('FreshairComponent', () => {
  let component: FreshairComponent;
  let fixture: ComponentFixture<FreshairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreshairComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreshairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevitAreaComponent } from './revit-area.component';

describe('RevitAreaComponent', () => {
  let component: RevitAreaComponent;
  let fixture: ComponentFixture<RevitAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevitAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevitAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevitLevelAreaComponent } from './revit-level-area.component';

describe('RevitLevelAreaComponent', () => {
  let component: RevitLevelAreaComponent;
  let fixture: ComponentFixture<RevitLevelAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevitLevelAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevitLevelAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

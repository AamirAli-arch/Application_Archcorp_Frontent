import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProjectMatrixElementComponent } from './view-project-matrix-element.component';

describe('ViewProjectMatrixElementComponent', () => {
  let component: ViewProjectMatrixElementComponent;
  let fixture: ComponentFixture<ViewProjectMatrixElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProjectMatrixElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProjectMatrixElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddprjectComponent } from './addprject.component';

describe('AddprjectComponent', () => {
  let component: AddprjectComponent;
  let fixture: ComponentFixture<AddprjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddprjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddprjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

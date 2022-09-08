import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderSpinerComponent } from './loader-spiner.component';

describe('LoaderSpinerComponent', () => {
  let component: LoaderSpinerComponent;
  let fixture: ComponentFixture<LoaderSpinerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaderSpinerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderSpinerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

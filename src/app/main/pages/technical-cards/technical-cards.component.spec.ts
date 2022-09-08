import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalCardsComponent } from './technical-cards.component';

describe('TechnicalCardsComponent', () => {
  let component: TechnicalCardsComponent;
  let fixture: ComponentFixture<TechnicalCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnicalCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicalCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

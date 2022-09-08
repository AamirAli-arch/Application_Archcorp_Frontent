import { TestBed } from '@angular/core/testing';

import { TechnicalCardsService } from './technical-cards.service';

describe('TechnicalCardsService', () => {
  let service: TechnicalCardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechnicalCardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

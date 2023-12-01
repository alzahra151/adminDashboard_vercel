import { TestBed } from '@angular/core/testing';

import { PriceOfferReqService } from './price-offer-req.service';

describe('PriceOfferReqService', () => {
  let service: PriceOfferReqService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriceOfferReqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

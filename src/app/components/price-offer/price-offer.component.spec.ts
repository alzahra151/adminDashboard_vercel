import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceOfferComponent } from './price-offer.component';

describe('PriceOfferComponent', () => {
  let component: PriceOfferComponent;
  let fixture: ComponentFixture<PriceOfferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PriceOfferComponent]
    });
    fixture = TestBed.createComponent(PriceOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

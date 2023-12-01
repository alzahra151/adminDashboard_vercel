import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOfferPriceComponent } from './add-offer-price.component';

describe('AddOfferPriceComponent', () => {
  let component: AddOfferPriceComponent;
  let fixture: ComponentFixture<AddOfferPriceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddOfferPriceComponent]
    });
    fixture = TestBed.createComponent(AddOfferPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

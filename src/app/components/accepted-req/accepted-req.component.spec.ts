import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedReqComponent } from './accepted-req.component';

describe('AcceptedReqComponent', () => {
  let component: AcceptedReqComponent;
  let fixture: ComponentFixture<AcceptedReqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcceptedReqComponent]
    });
    fixture = TestBed.createComponent(AcceptedReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

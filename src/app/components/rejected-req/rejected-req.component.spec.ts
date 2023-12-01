import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedReqComponent } from './rejected-req.component';

describe('RejectedReqComponent', () => {
  let component: RejectedReqComponent;
  let fixture: ComponentFixture<RejectedReqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RejectedReqComponent]
    });
    fixture = TestBed.createComponent(RejectedReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

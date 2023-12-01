import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllReqsComponent } from './all-reqs.component';

describe('AllReqsComponent', () => {
  let component: AllReqsComponent;
  let fixture: ComponentFixture<AllReqsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllReqsComponent]
    });
    fixture = TestBed.createComponent(AllReqsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

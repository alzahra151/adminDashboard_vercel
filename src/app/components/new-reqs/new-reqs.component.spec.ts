import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReqsComponent } from './new-reqs.component';

describe('NewReqsComponent', () => {
  let component: NewReqsComponent;
  let fixture: ComponentFixture<NewReqsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewReqsComponent]
    });
    fixture = TestBed.createComponent(NewReqsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

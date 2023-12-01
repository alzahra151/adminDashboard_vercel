import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqCardComponent } from './req-card.component';

describe('ReqCardComponent', () => {
  let component: ReqCardComponent;
  let fixture: ComponentFixture<ReqCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReqCardComponent]
    });
    fixture = TestBed.createComponent(ReqCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

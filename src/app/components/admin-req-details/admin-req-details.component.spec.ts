import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReqDetailsComponent } from './admin-req-details.component';

describe('AdminReqDetailsComponent', () => {
  let component: AdminReqDetailsComponent;
  let fixture: ComponentFixture<AdminReqDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminReqDetailsComponent]
    });
    fixture = TestBed.createComponent(AdminReqDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

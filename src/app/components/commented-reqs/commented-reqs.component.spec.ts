import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentedReqsComponent } from './commented-reqs.component';

describe('CommentedReqsComponent', () => {
  let component: CommentedReqsComponent;
  let fixture: ComponentFixture<CommentedReqsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentedReqsComponent]
    });
    fixture = TestBed.createComponent(CommentedReqsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

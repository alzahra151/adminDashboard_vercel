import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidBarComponent } from './sid-bar.component';

describe('SidBarComponent', () => {
  let component: SidBarComponent;
  let fixture: ComponentFixture<SidBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidBarComponent]
    });
    fixture = TestBed.createComponent(SidBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

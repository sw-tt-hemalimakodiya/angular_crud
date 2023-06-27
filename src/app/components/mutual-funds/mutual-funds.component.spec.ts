import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MutualFundsComponent } from './mutual-funds.component';

describe('MutualFundsComponent', () => {
  let component: MutualFundsComponent;
  let fixture: ComponentFixture<MutualFundsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MutualFundsComponent]
    });
    fixture = TestBed.createComponent(MutualFundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LenderItemComponent } from './lender-item.component';

describe('LenderItemComponent', () => {
  let component: LenderItemComponent;
  let fixture: ComponentFixture<LenderItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LenderItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LenderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

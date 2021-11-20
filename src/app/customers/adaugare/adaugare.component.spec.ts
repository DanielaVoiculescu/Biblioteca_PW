import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdaugareComponent } from './adaugare.component';

describe('AdaugareComponent', () => {
  let component: AdaugareComponent;
  let fixture: ComponentFixture<AdaugareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdaugareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdaugareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

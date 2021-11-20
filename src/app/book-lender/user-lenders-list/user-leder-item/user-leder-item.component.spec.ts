import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLederItemComponent } from './user-leder-item.component';

describe('UserLederItemComponent', () => {
  let component: UserLederItemComponent;
  let fixture: ComponentFixture<UserLederItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserLederItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLederItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

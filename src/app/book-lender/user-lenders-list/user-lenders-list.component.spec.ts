import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLendersListComponent } from './user-lenders-list.component';

describe('UserLendersListComponent', () => {
  let component: UserLendersListComponent;
  let fixture: ComponentFixture<UserLendersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserLendersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLendersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

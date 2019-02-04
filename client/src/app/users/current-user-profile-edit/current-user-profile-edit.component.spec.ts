import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentUserProfileEditComponent } from './current-user-profile-edit.component';

describe('CurrentUserProfileEditComponent', () => {
  let component: CurrentUserProfileEditComponent;
  let fixture: ComponentFixture<CurrentUserProfileEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentUserProfileEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentUserProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

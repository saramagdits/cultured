import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentUserRecipesComponent } from './current-user-recipes.component';

describe('CurrentUserRecipesComponent', () => {
  let component: CurrentUserRecipesComponent;
  let fixture: ComponentFixture<CurrentUserRecipesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentUserRecipesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentUserRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesCategoryComponent } from './recipes-category.component';

describe('RecipesCategoryComponent', () => {
  let component: RecipesCategoryComponent;
  let fixture: ComponentFixture<RecipesCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipesCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipesCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

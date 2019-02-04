import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesSearchComponent } from './recipes-search.component';

describe('RecipesSearchComponent', () => {
  let component: RecipesSearchComponent;
  let fixture: ComponentFixture<RecipesSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipesSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

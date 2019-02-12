import { Component, OnInit } from '@angular/core';
import {RecipesService} from '../shared/recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipes;
  // error;

  constructor(private recipesService: RecipesService) { }

  ngOnInit() {
  }
  onGetAllRecipes() {
    // This will return an observable
    this.recipesService.getAllRecipes()
      // .subscribe((data) => { this.recipes = {data}; });
      .subscribe((data) => { console.log(data); }, (error) => { console.log(error); });
  }
  onGetRecipeById() {
    this.recipesService.getRecipeById(100)
      .subscribe((data) => { console.log(data); }, (error) => { console.log(error); });
  }
  onSearchRecipesByTitle() {
    this.recipesService.searchRecipesByTitle('kimchi+pickles')
      .subscribe((data) => { console.log(data); }, (error) => { console.log(error); });
  }
  onSearchRecipesByIngredients() {
    this.recipesService.searchRecipesByIngredients('salt+cabbage')
      .subscribe((data) => { console.log(data); }, (error) => { console.log(error); });
  }
  onCreateNewRecipe() {
    const recipe = {
      title: 'kombucha',
      description: 'fizzy and fun',
      difficulty: 'medium',
      category: 'veggies',
      prepTime: '30 minutes',
      readyTime: '2 weeks',
      ingredients: [
        {
          value: 'water',
          unit: 'gallon',
          quantity: 1
        },
        {
          value: 'tea',
          unit: 'packets',
          quantity: 5
        }
      ]
    };
    this.recipesService.createNewRecipe(recipe)
      .subscribe((data) => { console.log(data); }, (error) => { console.log(error); });
  }
}

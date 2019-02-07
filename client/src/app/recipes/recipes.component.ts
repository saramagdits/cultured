import { Component, OnInit } from '@angular/core';
import {RecipesService} from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipes;
  error;
  constructor(private recipesService: RecipesService) { }

  ngOnInit() {
  }
  onGetAllRecipes() {
    // This will return an observable
    this.recipesService.getAllRecipes()
      // .subscribe((data) => { this.recipes = {data}; });
      .subscribe((data) => { console.log(data); }, error => { console.log(error); });
  }
}

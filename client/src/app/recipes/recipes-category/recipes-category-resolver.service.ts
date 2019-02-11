import { Injectable } from '@angular/core';
import { RecipesService } from '../../shared/recipes.service';

import { Resolve } from '@angular/router';

import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class RecipesCategoryResolver implements Resolve<any> {
  constructor(private recipesService: RecipesService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.recipesService.getRecipesByCategory(route.params.category);
  }
}

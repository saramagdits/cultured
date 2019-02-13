import {Injectable} from '@angular/core';

import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';

import {RecipesService} from '../../services/recipes.service';

import {Observable, of, EMPTY} from 'rxjs';

@Injectable()
export class RecipesSearchResolver implements Resolve<any> {
  constructor(private recipesService: RecipesService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    // Check whether ingredient or title params were given.
    if (route.queryParams.title) {
      console.log(route.queryParams.title);
      return this.recipesService.searchRecipesByTitle(route.queryParams.title ).pipe(recipes => {
          if (recipes) {
            return recipes;
          } else { // id not found
            this.router.navigate(['/']);
            // return EMPTY;
            return EMPTY;
          }
        }
      );
    }
    if (route.queryParams.ings) {
      console.log(route.queryParams.ings);
      return this.recipesService.searchRecipesByIngredients(route.queryParams.ings).pipe(recipes => {
          if (recipes) {
            return recipes;
          } else { // id not found
            this.router.navigate(['/']);
            // return EMPTY;
            return EMPTY;
          }
        }
      );
    }
  }
}

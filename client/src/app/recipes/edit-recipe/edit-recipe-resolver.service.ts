import {Injectable} from '@angular/core';

import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';

import {RecipesService} from '../../shared/recipes.service';

import {Observable, of, EMPTY} from 'rxjs';

@Injectable()
export class EditRecipeResolver implements Resolve<any> {
  constructor(private recipesService: RecipesService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.recipesService.getRecipeById(route.params.id).pipe(recipe => {
        if (recipe) {
          return recipe;
        } else { // id not found
          this.router.navigate(['/']);
          // return EMPTY;
          return EMPTY;
        }
      }
    );

  }
}

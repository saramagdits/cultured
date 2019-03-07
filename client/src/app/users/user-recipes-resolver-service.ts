import {Injectable} from '@angular/core';

import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';

import {RecipesService} from '../services/recipes.service';

import {Observable, of, EMPTY} from 'rxjs';

@Injectable()
export class UserRecipesResolver implements Resolve<any> {
  constructor(private recipesService: RecipesService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.recipesService.getRecipesByAuthorId(route.params.id).pipe(recipes => {
        if (recipes) {
          return recipes;
        } else { // recipes not found
          // this.router.navigate(['/']);
          // return EMPTY;
          return EMPTY;
        }
      }
    );

  }
}

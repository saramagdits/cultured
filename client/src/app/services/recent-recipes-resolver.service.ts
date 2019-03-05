import { Injectable } from '@angular/core';
import { RecipesService } from './recipes.service';

import {Resolve, Router} from '@angular/router';

import { ActivatedRouteSnapshot } from '@angular/router';
import {SplashComponent} from '../splash/splash.component';
import {EMPTY} from 'rxjs';

@Injectable()
export class RecentRecipesResolver implements Resolve<any> {
  constructor(private recipesService: RecipesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot) {
    if ( route.component === SplashComponent ) {
      // Specify how many recipes for the splash page
      return this.recipesService.getRecentRecipes(5).pipe(recipes => {
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

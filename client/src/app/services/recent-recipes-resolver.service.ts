import { Injectable } from '@angular/core';
import { RecipesService } from './recipes.service';

import { Resolve } from '@angular/router';

import { ActivatedRouteSnapshot } from '@angular/router';
import {SplashComponent} from '../splash/splash.component';

@Injectable()
export class RecentRecipesResolver implements Resolve<any> {
  constructor(private recipesService: RecipesService) {}

  resolve(route: ActivatedRouteSnapshot) {
    if ( route.component === SplashComponent ) {
      return this.recipesService.getRecentRecipes(4);
    }
  }
}

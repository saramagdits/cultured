import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {RecipesComponent} from './recipes/recipes.component';
import {HomeComponent} from './recipes/home/home.component';
import {SingleRecipeComponent} from './recipes/single-recipe/single-recipe.component';
import {EditRecipeComponent} from './recipes/edit-recipe/edit-recipe.component';
import {CurrentUserRecipesComponent} from './recipes/current-user-recipes/current-user-recipes.component';
import {RecipesSearchComponent} from './recipes/recipes-search/recipes-search.component';
import {RecipesCategoryComponent} from './recipes/recipes-category/recipes-category.component';
import {CreateRecipeComponent} from './recipes/create-recipe/create-recipe.component';
import {UsersComponent} from './users/users.component';
import {CurrentUserProfileComponent} from './users/current-user-profile/current-user-profile.component';
import {UserProfileComponent} from './users/user-profile/user-profile.component';
import {CurrentUserProfileEditComponent} from './users/current-user-profile-edit/current-user-profile-edit.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {SplashComponent} from './splash/splash.component';

// Routes are in order of most to least specific. Uses a "first-match-wins" strategy
// The '' empty path represents the default path
// The ** route is a wild card or catch all route.
const routes: Routes = [
  { path: 'recipes',
    component: RecipesComponent,
    data: { title: 'Heroes List' },
    children: [
      { path: 'self',
        component: CurrentUserRecipesComponent,
        data: { title: 'Heroes List' }
      },
      { path: 'search',
        component: RecipesSearchComponent,
        data: { title: 'Heroes List' }
      },
      { path: 'create',
        component: CreateRecipeComponent,
        data: { title: 'Heroes List' }
      },
      { path: 'browse/:category/:sub-category',
        component: RecipesCategoryComponent,
        data: { title: 'Heroes List' }
      },
      { path: 'browse/:category',
        component: RecipesCategoryComponent
      },
      { path: ':id/edit',
        component: EditRecipeComponent,
        data: { title: 'Heroes List' }
      },
      { path: ':id',
        component: SingleRecipeComponent,
        data: { title: 'Heroes List' }
      },
      { path: '',
        component: HomeComponent,
        pathMatch: 'full',
        data: { title: 'Heroes List' }
      },
      { path: '**', component: PageNotFoundComponent }
    ]
  },
  { path: 'users',
    component: UsersComponent,
    data: { title: 'Heroes List' },
    children: [
      { path: 'self/edit',
        component: CurrentUserProfileEditComponent,
        data: { title: 'Heroes List' }
      },
      { path: 'self',
        component: CurrentUserProfileComponent,
        data: { title: 'Heroes List' }
      },
      { path: ':id',
        component: UserProfileComponent,
        data: { title: 'Heroes List' }
      },
      // TODO figure out what this goes to
      { path: '',
        component: CurrentUserProfileComponent,
        pathMatch: 'full',
        data: { title: 'Heroes List' }
      },
      { path: '**', component: PageNotFoundComponent }
    ]
  },
  { path: 'login',
    component: LoginComponent,
    data: { title: 'Heroes List' }
  },
  { path: 'register',
    component: RegisterComponent,
    data: { title: 'Heroes List' }
  },
  // Or Home if logged in
  { path: '',
    component: SplashComponent,
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

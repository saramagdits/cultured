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
import {RecipesCategoryResolver} from './recipes/recipes-category/recipes-category-resolver.service';
import {SingleRecipeResolver} from './recipes/single-recipe/single-recipe-resolver.service';
import {EditRecipeResolver} from './recipes/edit-recipe/edit-recipe-resolver.service';
import {RecipesSearchResolver} from './recipes/recipes-search/recipes-search-resolver.service';
import {UserProfileResolver} from './users/user-profile/user-profile-resolver.service';
import {AuthGuard} from './guards/auth.guard';
import {RecentRecipesResolver} from './services/recent-recipes-resolver.service';

// Routes are in order of most to least specific. Uses a "first-match-wins" strategy
// The '' empty path represents the default path
// The ** route is a wild card or catch all route.
const routes: Routes = [
  { path: 'recipes',
    component: RecipesComponent,
    resolve: {recipes: RecentRecipesResolver},
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: 'self',
        component: CurrentUserRecipesComponent
      },
      { path: 'search',
        component: RecipesSearchComponent,
        resolve: {recipes: RecipesSearchResolver}
      },
      { path: 'create',
        component: CreateRecipeComponent
      },
      { path: 'browse/:category',
        resolve: {recipes: RecipesCategoryResolver},
        component: RecipesCategoryComponent
      },
      { path: ':id/edit',
        component: EditRecipeComponent,
        resolve: {recipe: EditRecipeResolver}
      },
      { path: ':id',
        component: SingleRecipeComponent,
        resolve: {recipe: SingleRecipeResolver}
      },
      { path: '',
        component: HomeComponent,
        pathMatch: 'full'
      },
      { path: '**', component: PageNotFoundComponent }
    ]
  },
  { path: 'users',
    component: UsersComponent,
    children: [
      { path: 'self/edit',
        component: CurrentUserProfileEditComponent
      },
      { path: 'self',
        component: CurrentUserProfileComponent
      },
      { path: ':id',
        component: UserProfileComponent,
        resolve: {user: UserProfileResolver}
      },
      // TODO figure out what this goes to
      { path: '',
        component: CurrentUserProfileComponent,
        pathMatch: 'full'
      },
      { path: '**', component: PageNotFoundComponent }
    ]
  },
  { path: 'login',
    component: LoginComponent
  },
  { path: 'logout',
    redirectTo: ''
  },
  { path: 'register',
    component: RegisterComponent
  },
  // Or Home if logged in
  { path: '',
    component: SplashComponent,
    resolve: {recipes: RecentRecipesResolver},
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

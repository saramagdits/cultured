import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { MainNavComponent } from './main-nav/main-nav.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './recipes/home/home.component';
import { EditRecipeComponent } from './recipes/edit-recipe/edit-recipe.component';
import { SingleRecipeComponent } from './recipes/single-recipe/single-recipe.component';
import { CurrentUserRecipesComponent } from './recipes/current-user-recipes/current-user-recipes.component';
import { RecipesSearchComponent } from './recipes/recipes-search/recipes-search.component';
import { RecipesCategoryComponent } from './recipes/recipes-category/recipes-category.component';
import { CreateRecipeComponent } from './recipes/create-recipe/create-recipe.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { CurrentUserProfileComponent } from './users/current-user-profile/current-user-profile.component';
import { CurrentUserProfileEditComponent } from './users/current-user-profile-edit/current-user-profile-edit.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SplashComponent } from './splash/splash.component';


@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    PageNotFoundComponent,
    HomeComponent,
    EditRecipeComponent,
    SingleRecipeComponent,
    CurrentUserRecipesComponent,
    RecipesSearchComponent,
    RecipesCategoryComponent,
    CreateRecipeComponent,
    UserProfileComponent,
    CurrentUserProfileComponent,
    CurrentUserProfileEditComponent,
    LoginComponent,
    RegisterComponent,
    SplashComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

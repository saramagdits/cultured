import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
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
import { RecipesComponent } from './recipes/recipes.component';
import { UsersComponent } from './users/users.component';
import { AltNavComponent } from './alt-nav/alt-nav.component';
import { SearchBarComponent } from './main-nav/search-bar/search-bar.component';
import { FormsModule } from '@angular/forms';
import { RecipesService } from './recipes/recipes.service';
import {UsersService} from './users/users.service';



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
    SplashComponent,
    RecipesComponent,
    UsersComponent,
    AltNavComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatCheckboxModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [RecipesService, UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
  MatInputModule, MatCardModule, MatGridListModule
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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RecipesService } from './services/recipes.service';
import {UsersService} from './services/users.service';
import {RecipesCategoryResolver} from './recipes/recipes-category/recipes-category-resolver.service';
import {SingleRecipeResolver} from './recipes/single-recipe/single-recipe-resolver.service';
import {HttpErrorHandlerService} from './services/http-error-handler.service';
import {EditRecipeResolver} from './recipes/edit-recipe/edit-recipe-resolver.service';
import {RecipesSearchResolver} from './recipes/recipes-search/recipes-search-resolver.service';
import {UserProfileResolver} from './users/user-profile/user-profile-resolver.service';
import {BasicAuthInterceptor} from './interceptors/basic-auth.interceptor';
import {ErrorInterceptor} from './interceptors/error.interceptor';
import {AuthenticationService} from './services/authentication.service';
import {RegisterService} from './services/register.service';
import { FooterComponent } from './footer/footer.component';
import { RecipeCardComponent } from './recipes/recipe-card/recipe-card.component';
import { RecipesGridComponent } from './recipes/recipes-grid/recipes-grid.component';

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
    SearchBarComponent,
    FooterComponent,
    RecipesGridComponent,
    RecipeCardComponent,
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
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatGridListModule
  ],
  providers: [
    RecipesService,
    UsersService,
    RegisterService,
    RecipesCategoryResolver,
    SingleRecipeResolver,
    EditRecipeResolver,
    RecipesSearchResolver,
    UserProfileResolver,
    HttpErrorHandlerService,
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

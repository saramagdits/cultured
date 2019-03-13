import {Component, OnChanges, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnChanges {
  public user;
  private recipes;
  public cards;
  public rowHeight;
  public layoutMode = '';
  public error;
  // Define breakpoints from breakpointObserver
  // Web : 1280px+
  // Tablet : 1279px - 960px
  // Handset: 959px-
  //
  // Activate different layouts depending on current breakpoint
  activateWebLayout() {
    this.rowHeight = '1:1.2';
    this.layoutMode = 'web';
    this.cards = this.recipes.map(
      (recipe, index) => {
        recipe.recipeRouterLink = `/recipes/${recipe.id}`;
        if (index === 0) {
          recipe.jumbo = true;
          recipe.cols = 12;
          recipe.rows = 3;
          // TODO add authorId to recipe data so we may navigate to the author's profile
          // recipe.authorRouterLink = `/users/${recipe.authorId}`;
          recipe.authorRouterLink = `/users/137`;
          return recipe;
        }
        recipe.jumbo = false;
        recipe.cols = 3;
        recipe.rows = 3;
        // TODO add authorId to recipe data so we may navigate to the author's profile
        // recipe.authorRouterLink = `/users/${recipe.authorId}`;
        recipe.authorRouterLink = `/users/137`;
        return recipe;
      }
    );
  }
  activateTabletLayout() {
    this.rowHeight = '1:1.14';
    this.layoutMode = 'tablet';
    this.cards = this.recipes.map(
      (recipe) => {
        recipe.jumbo = false;
        recipe.recipeRouterLink = `/recipes/${recipe.id}`;
        // TODO add authorId to recipe data so we may navigate to the author's profile
        // recipe.authorRouterLink = `/users/${recipe.authorId}`;
        recipe.authorRouterLink = `/users/137`;
        recipe.cols = 4;
        recipe.rows = 4;
        return recipe;
      }
    );
  }
  activateHandsetPortraitLayout() {
    this.rowHeight = '1:1.4';
    this.layoutMode = 'handset';
    this.cards = this.recipes.map(
      recipe => {
        recipe.jumbo = false;
        recipe.recipeRouterLink = `/recipes/${recipe.id}`;
        // TODO add authorId to recipe data so we may navigate to the author's profile
        // recipe.authorRouterLink = `/users/${recipe.authorId}`;
        recipe.authorRouterLink = `/users/137`;
        recipe.cols = 6;
        recipe.rows = 6;
        return recipe;
      }
    );
  }
  activateHandsetLandscapeLayout() {
    this.rowHeight = '1:1.22';
    this.layoutMode = 'handset';
    this.cards = this.recipes.map(
      recipe => {
        recipe.jumbo = false;
        recipe.recipeRouterLink = `/recipes/${recipe.id}`;
        // TODO add authorId to recipe data so we may navigate to the author's profile
        // recipe.authorRouterLink = `/users/${recipe.authorId}`;
        recipe.authorRouterLink = `/users/137`;
        recipe.cols = 4;
        recipe.rows = 4;
        return recipe;
      }
    );
  }
  constructor(private route: ActivatedRoute, private breakpointObserver: BreakpointObserver) { }
  ngOnChanges() {
    console.log(this.recipes);
  }
  ngOnInit() {
    this.route.data
      .subscribe((data: { user }) => {
        this.user = data.user;
      }, error => { this.error = error; });
    this.route.data
      .subscribe((data: { recipes }) => {
        this.recipes = data.recipes;
      }, error => { this.error = error; });
    this.breakpointObserver.observe([
      Breakpoints.Web
    ]).subscribe(result => {
      if (result.matches) {
        this.activateWebLayout();
      }
    });
    this.breakpointObserver.observe([
      Breakpoints.Tablet
    ]).subscribe(result => {
      if (result.matches) {
        this.activateTabletLayout();
      }
    });
    this.breakpointObserver.observe([
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      if (result.matches) {
        this.activateHandsetPortraitLayout();
      }
    });    this.breakpointObserver.observe([
      Breakpoints.HandsetLandscape
    ]).subscribe(result => {
      if (result.matches) {
        this.activateHandsetLandscapeLayout();
      }
    });
  }

}

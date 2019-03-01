import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {map} from 'rxjs/operators';
import {Breakpoints, BreakpointObserver} from '@angular/cdk/layout';
import {Router} from '@angular/router';
import {Ellipsis} from 'ftellipsis';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-recipes-grid',
  templateUrl: './recipes-grid.component.html',
  styleUrls: ['./recipes-grid.component.css']
})
export class RecipesGridComponent implements OnInit, OnChanges {
  @Input() recipes;
  public cards;
  public rowHeight;
  // Define breakpoints from breakpointObserver
  // Web : 1280px+
  // Tablet : 1279px - 960px
  // Handset: 959px-
  //
  // Activate different layouts depending on current breakpoint
  activateWebLayout() {
      this.rowHeight = '1:1.12';
      this.cards = this.recipes.map(
        (recipe, index) => {
          recipe.recipeRouterLink = `/recipes/${recipe.id}`;
          if (index === 0) {
            recipe.jumbo = true;
            recipe.cols = 4;
            recipe.rows = 1;
            // TODO add authorId to recipe data so we may navigate to the author's profile
            // recipe.authorRouterLink = `/users/${recipe.authorId}`;
            recipe.authorRouterLink = `/users/137`;
            return recipe;
          }
          recipe.jumbo = false;
          recipe.cols = 1;
          recipe.rows = 1;
          // TODO add authorId to recipe data so we may navigate to the author's profile
          // recipe.authorRouterLink = `/users/${recipe.authorId}`;
          recipe.authorRouterLink = `/users/137`;
          return recipe;
        }
      );
  }
  activateTabletLayout() {
      this.rowHeight = '1:1.25';
      this.cards = this.recipes.map(
        recipe => {
          recipe.jumbo = false;
          recipe.recipeRouterLink = `/recipes/${recipe.id}`;
          // TODO add authorId to recipe data so we may navigate to the author's profile
          // recipe.authorRouterLink = `/users/${recipe.authorId}`;
          recipe.authorRouterLink = `/users/137`;
          recipe.cols = 2;
          recipe.rows = 2;
          return recipe;
        }
      );
  }
  activateHandsetLayout() {
      this.rowHeight = '1:1';
      this.cards = this.recipes.map(
        recipe => {
          recipe.jumbo = false;
          recipe.recipeRouterLink = `/recipes/${recipe.id}`;
          // TODO add authorId to recipe data so we may navigate to the author's profile
          // recipe.authorRouterLink = `/users/${recipe.authorId}`;
          recipe.authorRouterLink = `/users/137`;
          recipe.cols = 2;
          recipe.rows = 2;
          return recipe;
        }
      );
  }

  constructor(private breakpointObserver: BreakpointObserver) {
  }

  ngOnChanges() {
  }

  ngOnInit() {
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
      Breakpoints.Handset
    ]).subscribe(result => {
      if (result.matches) {
        this.activateHandsetLayout();
      }
    });
  }
}

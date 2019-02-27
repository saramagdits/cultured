import {Component, Input, OnChanges, OnInit} from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {Router} from '@angular/router';
import { Ellipsis } from 'ftellipsis';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-recipes-grid',
  templateUrl: './recipes-grid.component.html',
  styleUrls: ['./recipes-grid.component.css']
})
export class RecipesGridComponent implements OnInit, OnChanges{
  @Input() recipes;
  cards;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall])
    .pipe(
      map(result => result.matches)
    );

  mapCards(recipes) {
    /** Based on the screen size, switch from standard to one column per row */
    this.cards = this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall]).pipe(
      map(({ matches }) => {
        if (matches) {
          return this.recipes.map(
            recipe => {
              recipe.recipeRouterLink = `/recipes/${recipe.id}`;
              // TODO add authorId to recipe data so we may navigate to the author's profile
              // recipe.authorRouterLink = `/users/${recipe.authorId}`;
              recipe.authorRouterLink = `/users/186`;
              recipe.cols = 2;
              recipe.rows = 2;
              return recipe;
            }
          );
        }
        return this.recipes.map(
          (recipe, index) => {
            recipe.routerLink = `/recipes/${recipe.id}`;
            if (index === 0 ) { recipe.cols = 4; recipe.rows = 1; return recipe; }
            // if (index % 7 === 0 ) { recipe.cols = 1; recipe.rows = 2; return recipe; }
            recipe.cols = 1;
            recipe.rows = 1;
            return recipe;
          }
        );
      })
    );
  }
  /** Based on the screen size, switch from standard to one column per row */
  // cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
  //   map(({ matches }) => {
  //     if (matches) {
  //       return this.recipes.map(
  //         recipe => {
  //           recipe.cols = 1;
  //           recipe.rows = 1;
  //           return recipe;
  //         }
  //       );
  //     }
  //     return this.recipes.map(
  //       (recipe, index) => {
  //         if (index === 0 ) { recipe.cols = 3; recipe.rows = 1; return recipe; }
  //         if (index % 7 === 0 ) { recipe.cols = 1; recipe.rows = 2; return recipe; }
  //         recipe.cols = 1;
  //         recipe.rows = 1;
  //         return recipe;
  //       }
  //     );
  //   })
  // );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) {}
  ngOnChanges() {
    this.mapCards(this.recipes);
  }
  ngOnInit() {
    this.mapCards(this.recipes);
    // Truncate recipe titles
    // const forEach = Array.prototype.forEach;
    // const els = document.getElementsByClassName('truncate');
    // forEach.call(els, function(el) {
    //   const ellipsis = new Ellipsis(el);
    //   ellipsis.calc();
    //   ellipsis.set();
    // });
    /** Based on the screen size, switch from standard to one column per row */
    // this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    //   map(({ matches }) => {
    //     if (matches) {
    //       return this.recipes.map(
    //         recipe => {
    //           recipe.cols = 1;
    //           recipe.rows = 1;
    //           return recipe;
    //         }
    //       );
    //     }
    //     return this.recipes.map(
    //       (recipe, index) => {
    //         if (index === 0 ) { recipe.cols = 3; recipe.rows = 1; return recipe; }
    //         if (index % 7 === 0 ) { recipe.cols = 1; recipe.rows = 2; return recipe; }
    //         recipe.cols = 1;
    //         recipe.rows = 1;
    //         return recipe;
    //       }
    //     );
    //   })
    // );
  }
}

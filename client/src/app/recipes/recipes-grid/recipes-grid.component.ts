import {Component, Input, OnChanges, OnInit} from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-recipes-grid',
  templateUrl: './recipes-grid.component.html',
  styleUrls: ['./recipes-grid.component.css']
})
export class RecipesGridComponent implements OnInit, OnChanges{
  @Input() recipes;
  cards;
  mapCards(recipes) {
    /** Based on the screen size, switch from standard to one column per row */
    this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(({ matches }) => {
        if (matches) {
          return this.recipes.map(
            recipe => {
              recipe.cols = 1;
              recipe.rows = 1;
              return recipe;
            }
          );
        }
        return this.recipes.map(
          (recipe, index) => {
            if (index === 0 ) { recipe.cols = 3; recipe.rows = 1; return recipe; }
            if (index % 7 === 0 ) { recipe.cols = 1; recipe.rows = 2; return recipe; }
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

  constructor(private breakpointObserver: BreakpointObserver) {}
  ngOnChanges() {
    this.mapCards(this.recipes);
  }
  ngOnInit() {
    this.mapCards(this.recipes);
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

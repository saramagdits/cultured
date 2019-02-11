import {Component, OnInit} from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {RecipesService} from '../../shared/recipes.service';

@Component({
  selector: 'app-recipes-category',
  templateUrl: './recipes-category.component.html',
  styleUrls: ['./recipes-category.component.css']
})
export class RecipesCategoryComponent implements OnInit {
  category: string;
  recipes: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipesService: RecipesService
  ) {}
  ngOnInit() {
    this.route.params.subscribe(params => {
    this.category = params['category'];
    // this.recipesService.getRecipesByCategory(this.category)
    //   .subscribe(data => this.recipes = data, error => console.log(error));
  });
    this.route.data
      .subscribe((data: { recipes }) => {
        this.recipes = data.recipes;
      });
  }
}

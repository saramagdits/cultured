import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-single-recipe',
  templateUrl: './single-recipe.component.html',
  styleUrls: ['./single-recipe.component.css']
})
export class SingleRecipeComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  recipe;
  error;
  ngOnInit() {
    this.route.data
      .subscribe((data: { recipe }) => {
        this.recipe = data.recipe;
      }, error => { this.error = error; });
  }
}

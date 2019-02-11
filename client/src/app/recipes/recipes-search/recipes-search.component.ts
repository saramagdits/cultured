import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-recipes-search',
  templateUrl: './recipes-search.component.html',
  styleUrls: ['./recipes-search.component.css']
})
export class RecipesSearchComponent implements OnInit {
  recipes;
  error;
  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { recipes }) => {
        this.recipes = data.recipes;
      }, error => { this.error = error; });
  }

}

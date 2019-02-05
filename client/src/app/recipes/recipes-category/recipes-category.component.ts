import {Component, OnInit} from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-recipes-category',
  templateUrl: './recipes-category.component.html',
  styleUrls: ['./recipes-category.component.css']
})
export class RecipesCategoryComponent implements OnInit {
  category: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe(params => {
      this.category = params['category'];
    });
  }
  ngOnInit() {
  }

}

import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe;
  constructor() { }

  ngOnInit() {
  }

}

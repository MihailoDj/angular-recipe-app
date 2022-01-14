import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe("Test Recipe", "Description test test", "https://static01.nyt.com/images/2021/02/17/dining/17tootired-grilled-cheese/17tootired-grilled-cheese-articleLarge.jpg?quality=75&auto=webp&disable=upscale"),
    new Recipe("Another recipe", "More descriptions", "https://thekitchencommunity.org/wp-content/uploads/2021/02/43-Foods-That-Start-With-E-1200x675.jpg"),
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

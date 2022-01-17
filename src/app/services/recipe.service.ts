import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../components/recipes/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  selectedRecipe = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe("Test Recipe", "Description test test", "https://static01.nyt.com/images/2021/02/17/dining/17tootired-grilled-cheese/17tootired-grilled-cheese-articleLarge.jpg?quality=75&auto=webp&disable=upscale"),
    new Recipe("Another recipe", "More descriptions", "https://thekitchencommunity.org/wp-content/uploads/2021/02/43-Foods-That-Start-With-E-1200x675.jpg"),
  ];

  constructor() { }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }
}

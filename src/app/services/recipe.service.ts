import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from '../components/recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe("Test Recipe", 
    "Description test test", 
    "https://static01.nyt.com/images/2021/02/17/dining/17tootired-grilled-cheese/17tootired-grilled-cheese-articleLarge.jpg?quality=75&auto=webp&disable=upscale",
    [
      new Ingredient("Meat", 1),
      new Ingredient("French fries", 20)
    ]),
    new Recipe("Another recipe", 
    "More descriptions", 
    "https://thekitchencommunity.org/wp-content/uploads/2021/02/43-Foods-That-Start-With-E-1200x675.jpg",
    [
      new Ingredient("Bread", 2),
      new Ingredient("Meat", 1)
    ]),
  ];

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }
}

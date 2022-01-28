import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Tomatoes", 10),
  ];

  constructor() { }

  addIngredient(ingredient: Ingredient) {
    for (let ing of this.ingredients) {
      if (ing.name === ingredient.name) {
        ing.amount += ingredient.amount;
        return;
      }
    }
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  addIngredients(ingredients: Ingredient[]) {
    let ingredientUpdated = false;

    for (let ing of this.ingredients) {
      for (let ingNew of ingredients) {
        if (ing.name === ingNew.name) {
          ing.amount += ingNew.amount;
          ingredientUpdated = true;
        }
      }
    }
    if (ingredientUpdated) {
      return;
    }

    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}

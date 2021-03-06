import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { Recipe } from '../components/recipes/recipe.model';
import { RecipeService } from '../services/recipe.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService
  ) {}

  postRecipes() {
    const recipes = this.recipeService.getRecipes();

    this.http
      .put(
        'https://angular-recipe-app-6e1f6-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
        recipes
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  getRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://angular-recipe-app-6e1f6-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}

import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id!: number;
  editMode: boolean = false;
  recipeForm!: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];

        //if ID doesn't exist we're in recipes/new, otherwise we're in recipes/{id}/edit 
        this.editMode = params['id'] != null;

        this.initForm();
      }
    );
  }

  private initForm() {
    let recipeName: String = '';
    let recipeImagePath: String = '';
    let recipeDescription: String = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe: Recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      if (recipe.ingredients) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name),
            'amount': new FormControl(ingredient.amount)
          }));
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipeImagePath),
      'description': new FormControl(recipeDescription),
      'ingredients': recipeIngredients
    });
  }

  onSubmit() {

  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

}

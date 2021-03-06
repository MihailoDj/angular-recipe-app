import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  @ViewChild('f', {static: false}) slForm!: NgForm;
  subscription!: Subscription;
  editMode: boolean = false;
  edittedItemIndex!: number;
  edittedItem!: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.edittedItemIndex = index;
        this.edittedItem = this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          name: this.edittedItem.name,
          amount: this.edittedItem.amount
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const ingredient = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.edittedItemIndex, ingredient);
    } else {
      this.shoppingListService.addIngredient(ingredient);
    }

    this.editMode = false;
    form.reset();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.edittedItemIndex);
    this.onClear();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

}

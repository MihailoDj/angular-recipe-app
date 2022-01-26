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
export class ShoppingListEditComponent implements OnInit, OnDestroy {
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

  onAddItem(form: NgForm) {
    const value = form.value;

    this.shoppingListService.addIngredient(new Ingredient(value.name, value.amount));
  }

  ngOnDestroy(): void {
      this.shoppingListService.startedEditing.unsubscribe();
  }

}

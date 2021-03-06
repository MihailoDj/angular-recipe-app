import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { ShoppingListComponent } from './shopping-list.component';

@NgModule({
  declarations: [
    ShoppingListComponent, 
    ShoppingListEditComponent
  ],
  imports: [
    FormsModule,  
    RouterModule, 
    ShoppingListRoutingModule,
    SharedModule
  ],
})
export class ShoppingListModule {}

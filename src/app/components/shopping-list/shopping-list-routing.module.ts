import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list.component";

const routes = [
  { path: '', component: ShoppingListComponent },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ]
})
export class ShoppingListRoutingModule {

}
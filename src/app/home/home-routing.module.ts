import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {ContactComponent} from "./components/contact/contact.component";
import {ShopComponent} from "./components/shop/shop.component";
import {AuthorComponent} from "./components/author/author.component";
import {CheckoutComponent} from "./components/checkout/checkout.component";
import {ProductComponent} from "../shared/components/product-list/product/product.component";
import {SingleComponent} from "./components/single/single.component";

const routes: Routes = [
  {
    path:"",
    component: HomeComponent,
  },
  {
    path:"contact",
    component: ContactComponent
  },
  {
    path:"shop",
    component: ShopComponent
  },
  {
    path:"author",
    component: AuthorComponent
  },
  {
    path:"checkout",
    component: CheckoutComponent
  },
  {
    path:"product/:id",
    component: SingleComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

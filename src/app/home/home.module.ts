import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from "./components/home/home.component";
import {ContactComponent} from './components/contact/contact.component';
import {ShopComponent} from './components/shop/shop.component';
import {AuthorComponent} from './components/author/author.component';
import {SharedModule} from "../shared/shared.module";
import {SingleComponent} from './components/single/single.component';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {HeroComponent} from './components/home/components/hero/hero.component';
import {FeaturesComponent} from './components/home/components/features/features.component';
import {ProductComponent} from './components/shop/components/product/product.component';
import {TestimonialsComponent} from './components/home/components/testimonials/testimonials.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    HomeComponent,
    ContactComponent,
    ShopComponent,
    AuthorComponent,
    SingleComponent,
    CheckoutComponent,
    HeroComponent,
    FeaturesComponent,
    ProductComponent,
    TestimonialsComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})

export class HomeModule {
}

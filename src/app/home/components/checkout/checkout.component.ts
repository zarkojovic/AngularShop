import {Component, OnInit} from '@angular/core';
import {CartService} from "../shop/business-logic/cart.service";
import {GetProductsService} from "../shop/business-logic/get-products.service";
import {map} from "rxjs";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  cartDetails: any[] = [];

  totalPrice: number = 0;

  constructor(
    public cartService: CartService,
    public productService: GetProductsService
  ) {
  }

  ngOnInit(): void {
    this.loadCartDetails();


  }

  loadCartDetails(): void {
    var items = this.cartService.getCartItems();

    if (items && items.length > 0) {
      this.productService.getProducts().pipe(
        map(products => products.filter(product => items.map(x => x.id).includes(product.id))),
        map(filteredProducts => {
          return filteredProducts.map(product => {
            const cartItem = items.find(item => item.id === product.id);
            return {
              ...product,
              quantity: cartItem?.quantity,
              totalPrice: cartItem?.quantity ? Math.round(cartItem?.quantity * product.price * 100) / 100 : product.price
            };
          });
        })
      ).subscribe(cartDetails => {
        this.cartDetails = cartDetails;
        this.totalPrice = Math.round(this.cartDetails.reduce((sum, item) => sum + item.totalPrice, 0) * 100) / 100;

        console.log(this.cartDetails, this.totalPrice);
      });
    }
  }

  makeOrder(): void {
    this.cartService.clearCart();
    window.location.reload();
  }
}

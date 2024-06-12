import {Component, Input, OnInit} from '@angular/core';
import {IProduct} from "../../interfaces/i-product";
import {CartService} from "../../business-logic/cart.service";
import {CartItem} from "../../interfaces/cart-item";

@Component({
  selector: 'app-product-item',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  @Input() product: IProduct = {
    id: 0,
    title: '',
    description: '',
    price: 0,
    categoryId: 0,
    brandId: 0,
    image: "images/product-01,.jpg"
  };
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  addToCart(productId: number, quantity: number): void {
    this.cartService.updateCartItem(productId, quantity);
    this.cartItems = this.cartService.getCartItems();

    console.log(this.cartItems);
  }


}

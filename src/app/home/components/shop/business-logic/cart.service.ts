import {Injectable} from '@angular/core';
import {CartItem} from '../interfaces/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private storageKey = 'cartItems';

  constructor() {
  }

  // Get all cart items
  getCartItems(): CartItem[] {
    const items = localStorage.getItem(this.storageKey);
    return items ? JSON.parse(items) : [];
  }

  // Add or update a cart item
  updateCartItem(id: number, quantity: number): void {
    const cartItems = this.getCartItems();
    const existingItem = cartItems.find(item => item.id === id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cartItems.push({id, quantity});
    }

    this.saveCartItems(cartItems);
  }

  // Remove a cart item
  removeCartItem(id: number): void {
    let cartItems = this.getCartItems();
    cartItems = cartItems.filter(item => item.id !== id);
    this.saveCartItems(cartItems);
  }

  // Clear the cart
  clearCart(): void {
    localStorage.removeItem(this.storageKey);
  }

  // Save cart items to localStorage
  private saveCartItems(cartItems: CartItem[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(cartItems));
  }
}

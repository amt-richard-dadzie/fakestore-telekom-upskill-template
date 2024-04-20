import { Injectable } from '@angular/core';
import { Cart, CartItem } from '../../types/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cart: Cart = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  };

  public constructor() {
    this.cart = this.loadCart();
  }

  public addToCart(newProduct: CartItem) {
    const existingProductIndex = this.cart.items.findIndex(
      (item) => item.id === newProduct.id
    );
    if (existingProductIndex !== -1) {
      this.cart.items[existingProductIndex].quantity = newProduct.quantity;
    } else {
      this.cart.items.push(newProduct);
    }

    this.cart.totalQuantity = this.cart.items.reduce(
      (total, item) => total + item.quantity,
      0
    );

    this.cart.totalPrice = this.cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  public removeItemFromCart(itemId: number) {
    const itemToRemoveIndex = this.cart.items.findIndex(
      (item) => item.id === itemId
    );
    if (itemToRemoveIndex !== -1) {
      const itemToRemove = this.cart.items[itemToRemoveIndex];

      this.cart.totalQuantity -= itemToRemove.quantity;
      this.cart.totalPrice -= itemToRemove.price * itemToRemove.quantity;

      this.cart.items.splice(itemToRemoveIndex, 1);
    }
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  public updatedCartItemQuantity(productId: number, quantity: number) {
    const productToUpdate = this.cart.items.find(
      (product) => product.id === productId
    );

    if (productToUpdate) {
      const changeInQuantity = quantity - productToUpdate.quantity;

      this.cart.totalQuantity += changeInQuantity;
      this.cart.totalPrice += changeInQuantity * productToUpdate.price;

      productToUpdate.quantity = quantity;
    }
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  private loadCart() {
    const storedCart = localStorage.getItem('cart');
    return storedCart
      ? JSON.parse(storedCart)
      : {
        items: [],
        totalQuantity: 0,
        totalPrice: 0,
      };
  }

  public clearCart() {
    localStorage.removeItem('cart');
    this.cart = {
      items: [],
      totalQuantity: 0,
      totalPrice: 0,
    };
  }
}

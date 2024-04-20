import { Component, inject } from '@angular/core';
import { CartService } from '../../service/cart/cart.service';
import { RouterModule } from '@angular/router';
import { Cart } from '../../types/cart';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  private cartService: CartService = inject(CartService);


  public cartItems(): number {
    const items = localStorage.getItem('cart');
    if (items) {
      const existingCartItems: Cart = JSON.parse(items);
      console.log(existingCartItems);
      return existingCartItems.items.length;
    }
    return this.cartService.cart.items.length;
  }
}

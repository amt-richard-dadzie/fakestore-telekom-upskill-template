import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../service/cart/cart.service';
import { Cart } from '../../types/cart';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  public cart!: Cart;
  private cartService: CartService = inject(CartService);

  public ngOnInit(): void {
    this.cart = this.cartService.cart;
  }

  public calculateTotal(price: number, quantity: number): number {
    return price * quantity;
  }

  public onProductQuantityDecrease(productId: number, quantity: number) {
    this.cartService.updatedCartItemQuantity(
      productId,
      Math.max(1, quantity - 1)
    );
  }

  public onProductQuantityIncrease(productId: number, quantity: number) {
    this.cartService.updatedCartItemQuantity(
      productId,
      Math.min(10, quantity + 1)
    );
  }

  public removeItem(itemId: number) {
    this.cartService.removeItemFromCart(itemId);
  }
}

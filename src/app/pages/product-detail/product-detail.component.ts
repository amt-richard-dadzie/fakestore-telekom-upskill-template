import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../service/product/product.service';
import { Observable } from 'rxjs';
import { Product } from '../../types/product';
import {  CommonModule } from '@angular/common';
import { CartService } from '../../service/cart/cart.service';
import { CartItem } from '../../types/cart';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  private totalQuantityAvailable = 10;
  public product$!: Observable<Product>;
  public quantity = 1;

  
  private route: ActivatedRoute = inject(ActivatedRoute);
  private productService: ProductService = inject(ProductService);
  private cartService: CartService = inject(CartService);
 
  public ngOnInit(): void {
    const productId = this.route.snapshot.params['id'];
    this.product$ = this.productService.fetchProduct(productId);
  }

  public onQuantityDecrease() {
    this.quantity = Math.max(1, this.quantity - 1);
  }
  public onQuantityIncrease() {
    this.quantity = Math.min(
      this.totalQuantityAvailable,
      Math.max(this.quantity + 1, this.quantity)
    );
  }

  public onAddToCart(product: Product) {
    const productToCart: CartItem = {
      id: product.id,
      price: product.price,
      name: product.title,
      image: product.image,
      category: product.category,
      quantity: this.quantity,
    };
    this.cartService.addToCart(productToCart);
  }
}

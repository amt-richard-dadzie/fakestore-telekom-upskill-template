import { Component, Input } from '@angular/core';
import { Product } from '../../types/product';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() public product: Product = {
    id: 0,
    title: '',
    price: 0,
    category: '',
    description: '',
    rating: {rate: 0, count: 0},
    image: '',
  };
}

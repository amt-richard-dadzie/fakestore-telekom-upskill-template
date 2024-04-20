import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../service/product/product.service';
import {
  concat,
  debounceTime,
  distinctUntilChanged,
  Observable,
  switchMap,
} from 'rxjs';
import { Product } from '../../types/product';
import {  CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { SearchService } from '../../service/search/search.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports: [CommonModule, ProductCardComponent],
})
export class ProductListComponent implements OnInit {
  public products$!: Observable<Product[]>;

 
  private productService: ProductService = inject(ProductService);
  private searchService: SearchService = inject(SearchService);
 

  public ngOnInit(): void {
    const searchProducts$ = this.searchService.searchValue$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((searchTerm) => this.productService.searchProducts(searchTerm))
    );

    const initialProducts$ = this.productService.fetchAllProducts();
    this.products$ = concat(initialProducts$, searchProducts$);
  }
}

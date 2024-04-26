import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Product } from '../../types/product';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private storeProducts!: Product[];

  private http: HttpClient = inject(HttpClient);

  public fetchAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}/products`).pipe(
      tap((products) => {
        this.storeProducts = products;
      })
    );
  }

  public fetchProduct(productId: number): Observable<Product> {
    return this.http.get<Product>(
      `${environment.apiUrl}/products/${productId}`
    );
  }

  public searchProducts(searchTerm: string): Observable<Product[]> {
    if (!this.storeProducts) {
      return this.fetchAllProducts().pipe(
        map(() => this.filterProducts(searchTerm))
      );
    } else {
      return new Observable<Product[]>((observer) => {
        observer.next(this.filterProducts(searchTerm));
        observer.complete();
      });
    }
  }
  private filterProducts(searchTerm: string): Product[] {
    if (!searchTerm) {
      return this.storeProducts;
    }
    return this.storeProducts.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}

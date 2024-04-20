import { AuthService } from './../../service/auth/auth.service';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { AsyncPipe } from '@angular/common';
import { CartComponent } from '../../components/cart/cart.component';
import { SearchService } from '../../service/search/search.service';
import { CartService } from '../../service/cart/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductCardComponent, CartComponent, AsyncPipe, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  @ViewChild('dropDown') public dropDown!: ElementRef;

  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private cartService: CartService = inject(CartService);
  private searchService: SearchService = inject(SearchService);

  public toggleLogoutPopUp() {
    if (this.dropDown) {
      this.dropDown.nativeElement.classList.toggle('hidden');
    }
  }

  public onSearchInput(event: KeyboardEvent): void {
    const searchValue = (event.target as HTMLInputElement).value;
    this.searchService.setSearchValue(searchValue);
  }

  public logOut() {
    this.authService.logOut();
    this.cartService.clearCart();
    this.router.navigate(['login']);
  }
}

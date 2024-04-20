import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';


@Injectable({ providedIn: 'root' })
class AuthGuard {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  public canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}

export const authGuard: CanActivateFn = () => {
  return inject(AuthGuard).canActivate();
};

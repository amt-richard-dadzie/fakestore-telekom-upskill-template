import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);

  public login(credentials: { username: string; password: string }) {
    return this.http
      .post<{token: string}>(`${environment.apiUrl}/auth/login`, credentials)
      .pipe(
        tap((res) => {
          this.storeToken(res.token);
        })
      );
  }
  public logOut() {
    localStorage.removeItem('user');
  }
  public isAuthenticated() {
    return !!localStorage.getItem('user');
  }

  private storeToken(token: string) {
    localStorage.setItem('user', token);
  }
}
